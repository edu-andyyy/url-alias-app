from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud.user import crud_create_user
from app.exceptions import UserAlreadyExistsError, UserCreateError
from app.models import User
from app.schemas.user import UserCreate, UserResponse

router = APIRouter()


@router.post(
    "",
    description="Register a new user.",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_201_CREATED: {"description": "User registered successfully"},
        status.HTTP_400_BAD_REQUEST: {"description": "User registration failed"},
    },
)
def register_user(
    user_in: UserCreate,
    db: Session = Depends(get_db),
) -> UserResponse:
    try:
        user: User = crud_create_user(
            db=db,
            username=user_in.username,
            plain_password=user_in.password,
        )
    except (UserAlreadyExistsError, UserCreateError) as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    return UserResponse.model_validate(user)
