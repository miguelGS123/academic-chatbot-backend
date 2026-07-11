from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.repositories.user_repository import (
    create_user,
    get_user_by_email,
)


def register_user(
    db: Session,
    full_name: str,
    email: str,
    password: str,
    career: str,
    cycle: int,
):
    normalized_email = email.strip().lower()

    existing_user = get_user_by_email(
        db,
        normalized_email,
    )

    if existing_user:
        return None

    hashed_password = hash_password(password)

    return create_user(
        db,
        full_name.strip(),
        normalized_email,
        hashed_password,
        career,
        cycle,
    )


def login_user(
    db: Session,
    email: str,
    password: str,
) -> str | None:
    normalized_email = email.strip().lower()

    user = get_user_by_email(
        db,
        normalized_email,
    )

    if not user:
        return None

    if not user.is_active:
        return None

    if not verify_password(
        password,
        user.password,
    ):
        return None

    return create_access_token(
        user_id=user.id,
        email=user.email,
        role=user.role,
    )