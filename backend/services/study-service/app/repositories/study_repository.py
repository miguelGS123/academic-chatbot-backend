from sqlalchemy.orm import Session

from app.models.learning_platform_model import LearningPlatform
from app.models.study_model import Certification, LearningRoute, StudyCurriculum
from app.models.user_model import User


class StudyRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_by_id(self, user_id: int):
        return self.db.query(User).filter(User.id == user_id).first()

    def get_curriculum(self, career: str, cycle: int | None = None):
        query = self.db.query(StudyCurriculum).filter(
            StudyCurriculum.career.ilike(career)
        )

        if cycle is not None:
            query = query.filter(StudyCurriculum.cycle == cycle)

        return query.order_by(
            StudyCurriculum.cycle.asc(),
            StudyCurriculum.course_name.asc(),
        ).all()

    def get_course_by_code_or_name(self, course_reference: str):
        reference = course_reference.strip()

        return (
            self.db.query(StudyCurriculum)
            .filter(
                (StudyCurriculum.course_code.ilike(reference))
                | (StudyCurriculum.course_name.ilike(reference))
            )
            .first()
        )

    def get_courses_by_codes(self, course_codes: list[str]):
        if not course_codes:
            return []

        normalized_codes = [code.upper() for code in course_codes]

        return (
            self.db.query(StudyCurriculum)
            .filter(StudyCurriculum.course_code.in_(normalized_codes))
            .order_by(StudyCurriculum.cycle.asc())
            .all()
        )

    def get_courses_unlocked_by_course(self, course_code: str):
        return (
            self.db.query(StudyCurriculum)
            .filter(StudyCurriculum.prerequisites.any(course_code.upper()))
            .order_by(
                StudyCurriculum.cycle.asc(),
                StudyCurriculum.course_name.asc(),
            )
            .all()
        )

    def get_certifications(self, area: str | None = None):
        query = self.db.query(Certification)

        if area:
            query = query.filter(Certification.area.ilike(f"%{area}%"))

        return query.order_by(Certification.title.asc()).all()

    def get_learning_routes_by_user(self, user_id: int):
        return (
            self.db.query(LearningRoute)
            .filter(LearningRoute.user_id == user_id)
            .order_by(LearningRoute.created_at.desc())
            .all()
        )

    def get_learning_platforms(self, area: str | None = None):
        query = self.db.query(LearningPlatform).filter(
            LearningPlatform.is_active.is_(True)
        )

        if area:
            query = query.filter(LearningPlatform.areas.any(area.lower()))

        return query.order_by(LearningPlatform.name.asc()).all()