from typing import Any

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.db.session import get_db
from app.models.user_model import User
from app.repositories.user_repository import get_user_by_email


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/users/login",
)


def build_credentials_exception() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudieron validar las credenciales.",
        headers={
            "WWW-Authenticate": "Bearer",
        },
    )


def get_token_payload(
    token: str = Depends(oauth2_scheme),
) -> dict[str, Any]:
    try:
        payload = decode_access_token(token)
    except ValueError as error:
        raise build_credentials_exception() from error

    email = payload.get("sub")
    user_id = payload.get("user_id")

    if not email or not user_id:
        raise build_credentials_exception()

    return payload


def get_current_user(
    payload: dict[str, Any] = Depends(get_token_payload),
    db: Session = Depends(get_db),
) -> User:
    email = payload.get("sub")

    if not isinstance(email, str):
        raise build_credentials_exception()

    user = get_user_by_email(
        db,
        email,
    )

    if user is None:
        raise build_credentials_exception()

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="El usuario se encuentra inactivo.",
        )

    token_user_id = payload.get("user_id")

    if token_user_id != user.id:
        raise build_credentials_exception()

    return user