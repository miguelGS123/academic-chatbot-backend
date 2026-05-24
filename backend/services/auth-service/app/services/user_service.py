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
    existing_user = get_user_by_email(
        db,
        email,
    )

    if existing_user:
        return None

    hashed_password = hash_password(password)

    user = create_user(
        db,
        full_name,
        email,
        hashed_password,
        career,
        cycle,
    )

    return user


def login_user(
    db: Session,
    email: str,
    password: str,
):
    user = get_user_by_email(
        db,
        email,
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

    access_token = create_access_token({
        "sub": user.email,
    })

    return access_token