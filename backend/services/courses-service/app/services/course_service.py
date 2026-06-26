from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.course_repository import CourseRepository


class CourseService:
    def __init__(self, db: Session):
        self.repository = CourseRepository(db)

    def get_all_courses(
        self,
        career: str | None = None,
        cycle: int | None = None,
    ):
        return self.repository.get_all_courses(career=career, cycle=cycle)

    def get_student_courses(self, user_id: int):
        return self.repository.get_student_courses(user_id=user_id)

    def get_course_detail(self, course_reference: str):
        course = self.repository.get_course_by_code_or_name(course_reference)

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Curso no encontrado.",
            )

        schedules = self.repository.get_course_schedules(course_id=course.id)
        syllabus = self.repository.get_course_syllabus(course_id=course.id)

        return {
            "course": course,
            "schedules": schedules,
            "syllabus": syllabus,
        }

    def get_course_schedule(self, course_reference: str):
        course = self.repository.get_course_by_code_or_name(course_reference)

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Curso no encontrado.",
            )

        return self.repository.get_course_schedules(course_id=course.id)

    def get_course_syllabus(self, course_reference: str):
        course = self.repository.get_course_by_code_or_name(course_reference)

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Curso no encontrado.",
            )

        return self.repository.get_course_syllabus(course_id=course.id)