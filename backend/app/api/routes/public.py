import logging
from datetime import datetime, timezone

from fastapi import APIRouter, status, Depends, Request
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse

from app.api.deps import get_db
from app.core.config import settings
from app.crud.link import crud_get_link_by_short_id
from app.crud.stats import crud_log_click
from app.exceptions import ClickLogError
from app.models import Link

logger = logging.getLogger(__name__)

router = APIRouter()


# Kept as a module-level constant for test compatibility.
FRONTEND_URL: str = settings.FRONTEND_URL.rstrip("/")


def _frontend_base_url(request: Request) -> str:
    forwarded_proto = request.headers.get("x-forwarded-proto")
    forwarded_host = request.headers.get("x-forwarded-host")

    if forwarded_proto or forwarded_host:
        scheme = (forwarded_proto or request.url.scheme).split(",", 1)[0].strip()
        host = (forwarded_host or request.headers.get("host") or "").split(",", 1)[0].strip()
        if host:
            return f"{scheme}://{host}".rstrip("/")

    return FRONTEND_URL


@router.get(
    "/{short_id}",
    description="Get a link by short ID.",
    status_code=status.HTTP_302_FOUND,
    responses={
        status.HTTP_302_FOUND: {"description": "Redirects to the original URL or error page"},
    }
)
def redirect_to_original(
        short_id: str,
        request: Request,
        db: Session = Depends(get_db),
):
    frontend_base_url = _frontend_base_url(request)

    link: Link | None = crud_get_link_by_short_id(db, short_id)

    if link is None:
        return RedirectResponse(
            url=f"{frontend_base_url}/not-found",
            status_code=status.HTTP_302_FOUND
        )

    if not link.is_active:
        return RedirectResponse(
            url=f"{frontend_base_url}/link-inactive",
            status_code=status.HTTP_302_FOUND
        )

    now: datetime = datetime.now(timezone.utc)
    if link.expire_at.replace(tzinfo=timezone.utc) <= now:
        return RedirectResponse(
            url=f"{frontend_base_url}/link-expired",
            status_code=status.HTTP_302_FOUND
        )

    try:
        crud_log_click(db, link.id)
    except ClickLogError as e:
        logger.error(f"Error logging click for link {link.id}: {str(e)}")

    return RedirectResponse(
        url=link.orig_url,
        status_code=status.HTTP_302_FOUND
    )
