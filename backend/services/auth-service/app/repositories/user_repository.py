from sqlalchemy.orm import Session

from app.models.user_model import User


def get_user_by_email(
    db: Session,
    email: str,
):
    return db.query(User).filter(
        User.email == email
    ).first()


def create_user(
    db: Session,
    full_name: str,
    email: str,
    password: str,
    career: str,
    cycle: int,
):
    user = User(
        full_name=full_name,
        email=email,
        password=password,
        role="student",
        career=career,
        cycle=cycle,
        is_active=True,
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user