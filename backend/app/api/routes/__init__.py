from fastapi import APIRouter

from app.api.routes.links import router as links_router

main_router = APIRouter()
main_router.include_router(links_router, prefix="/api/links", tags=["Links 🔗"])
