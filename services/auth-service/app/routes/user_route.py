from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.schemas.user_schema import (
    UserCreate,
    UserResponse
)

from app.schemas.token_schema import Token

from app.services.user_service import (
    register_user,
    login_user
)

from app.db.session import get_db

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    created_user = register_user(
        db,
        user.full_name,
        user.email,
        user.password
    )

    if not created_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return created_user


@router.post(
    "/login",
    response_model=Token
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    access_token = login_user(
        db,
        form_data.username,
        form_data.password
    )

    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }