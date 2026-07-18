from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
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


def build_current_user_response(
    user: User,
) -> CurrentUserResponse:
    return CurrentUserResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        university=resolve_university_by_email(user.email),
        role=user.role,
        career=user.career,
        cycle=user.cycle,
        is_active=user.is_active,
    )


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
) -> UserResponse:
    created_user = register_user(
        db=db,
        full_name=user.full_name,
        email=user.email,
        password=user.password,
        career=user.career,
        cycle=user.cycle,
    )

    if not created_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El correo ya se encuentra registrado.",
        )

    return created_user


@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    access_token = login_user(
        db=db,
        email=form_data.username,
        password=form_data.password,
    )

    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas.",
            headers={
                "WWW-Authenticate": "Bearer",
            },
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
) -> CurrentUserResponse:
    return build_current_user_response(current_user)


@router.get(
    "/validate",
    response_model=CurrentUserResponse,
    include_in_schema=False,
)
def validate_access_token(
    current_user: User = Depends(get_current_user),
) -> CurrentUserResponse:
    return build_current_user_response(current_user)