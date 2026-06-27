from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.teacher_repository import TeacherRepository


class TeacherService:
    def __init__(self, db: Session):
        self.repository = TeacherRepository(db)

    def get_all_teachers(self):
        return self.repository.get_all_teachers()

    def get_teacher_detail(
        self,
        teacher_reference: str,
        academic_period: str | None = None,
    ):
        teacher = None

        if teacher_reference.isdigit():
            teacher = self.repository.get_teacher_by_id(
                teacher_id=int(teacher_reference)
            )

        if not teacher:
            teacher = self.repository.get_teacher_by_name_or_email(
                reference=teacher_reference
            )

        if not teacher:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Docente no encontrado.",
            )

        profile = self.repository.get_teacher_profile(
            teacher_id=teacher.id
        )

        assigned_courses = self.repository.get_teacher_courses(
            teacher_id=teacher.id,
            academic_period=academic_period,
        )

        return {
            "teacher": teacher,
            "profile": profile,
            "assigned_courses": assigned_courses,
        }

    def get_teachers_by_user_courses(
        self,
        user_id: int,
        academic_period: str | None = None,
    ):
        return self.repository.get_teachers_by_user_courses(
            user_id=user_id,
            academic_period=academic_period,
        )