from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.study_repository import StudyRepository


class StudyService:
    def __init__(self, db: Session):
        self.repository = StudyRepository(db)

    def get_curriculum(self, career: str, cycle: int | None = None):
        return self.repository.get_curriculum(career=career, cycle=cycle)

    def get_next_cycle_courses(self, user_id: int):
        user = self.repository.get_user_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado.",
            )

        if not user.career or not user.cycle:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El usuario no tiene carrera o ciclo registrado.",
            )

        next_cycle = user.cycle + 1

        if next_cycle > 10:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El estudiante ya se encuentra en el último ciclo.",
            )

        courses = self.repository.get_curriculum(
            career=user.career,
            cycle=next_cycle,
        )

        return {
            "user_id": user.id,
            "student_name": user.full_name,
            "career": user.career,
            "current_cycle": user.cycle,
            "next_cycle": next_cycle,
            "courses": courses,
        }

    def get_course_prerequisites(self, course_reference: str):
        course = self.repository.get_course_by_code_or_name(course_reference)

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Curso no encontrado. Ingresa el código o nombre exacto del curso.",
            )

        prerequisites = course.prerequisites or []

        prerequisite_courses = self.repository.get_courses_by_codes(prerequisites)

        found_codes = {item.course_code.upper() for item in prerequisite_courses}

        external_requirements = [
            code for code in prerequisites if code.upper() not in found_codes
        ]

        return {
            "course": course,
            "prerequisite_courses": prerequisite_courses,
            "external_requirements": external_requirements,
        }

    def get_course_unlocks(self, course_reference: str):
        course = self.repository.get_course_by_code_or_name(course_reference)

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Curso no encontrado. Ingresa el código o nombre exacto del curso.",
            )

        unlocked_courses = self.repository.get_courses_unlocked_by_course(
            course.course_code
        )

        return {
            "course": course,
            "unlocked_courses": unlocked_courses,
        }

    def get_certifications(self, area: str | None = None):
        return self.repository.get_certifications(area=area)

    def get_learning_routes_by_user(self, user_id: int):
        return self.repository.get_learning_routes_by_user(user_id=user_id)

    def get_learning_platforms(self, area: str | None = None):
        return self.repository.get_learning_platforms(area=area)