from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user

from app.db.session import get_db

from app.models.user_model import User

from app.schemas.token_schema import Token

from app.schemas.user_schema import (
    CurrentUserResponse,
    UserCreate,
    UserResponse,
)

from app.services.user_service import (
    login_user,
    register_user,
)

from app.utils.university_resolver import resolve_university_by_email

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    created_user = register_user(
        db,
        user.full_name,
        user.email,
        user.password,
        user.career,
    )

    if not created_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    return created_user


@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    access_token = login_user(
        db,
        form_data.username,
        form_data.password,
    )

    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get(
    "/me",
    response_model=CurrentUserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return CurrentUserResponse(
        id=current_user.id,
        full_name=current_user.full_name,
        email=current_user.email,
        university=resolve_university_by_email(current_user.email),
        role=current_user.role,
        career=current_user.career,
        is_active=current_user.is_active,
    )