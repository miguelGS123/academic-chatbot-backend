from sqlalchemy import func, or_
from sqlalchemy.orm import Session, aliased

from app.models.learning_platform_model import LearningPlatform
from app.models.study_model import (
    Certification,
    CurriculumCourseSpecialization,
    CurriculumPlan,
    CurriculumPrerequisite,
    LearningRoute,
    SpecializationArea,
    StudyCurriculum,
)
from app.models.user_model import User


class StudyRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_by_id(self, user_id: int):
        return (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    def get_curriculum_plan(
        self,
        career: str,
        curriculum_code: str = "C2",
    ):
        return (
            self.db.query(CurriculumPlan)
            .filter(
                func.lower(CurriculumPlan.career)
                == career.strip().lower()
            )
            .filter(
                func.lower(CurriculumPlan.curriculum_code)
                == curriculum_code.strip().lower()
            )
            .filter(CurriculumPlan.is_active.is_(True))
            .first()
        )

    def get_curriculum(
        self,
        career: str,
        cycle: int | None = None,
        curriculum_code: str = "C2",
    ):
        query = (
            self.db.query(StudyCurriculum)
            .join(
                CurriculumPlan,
                StudyCurriculum.curriculum_plan_id
                == CurriculumPlan.id,
            )
            .filter(
                func.lower(CurriculumPlan.career)
                == career.strip().lower()
            )
            .filter(
                func.lower(CurriculumPlan.curriculum_code)
                == curriculum_code.strip().lower()
            )
            .filter(CurriculumPlan.is_active.is_(True))
            .filter(StudyCurriculum.is_active.is_(True))
        )

        if cycle is not None:
            query = query.filter(
                StudyCurriculum.cycle == cycle
            )

        return query.order_by(
            StudyCurriculum.cycle.asc(),
            StudyCurriculum.course_code.asc(),
        ).all()

    def get_course_by_code_or_name(
        self,
        course_reference: str,
        career: str | None = None,
        curriculum_code: str = "C2",
    ):
        reference = course_reference.strip()

        query = (
            self.db.query(StudyCurriculum)
            .join(
                CurriculumPlan,
                StudyCurriculum.curriculum_plan_id
                == CurriculumPlan.id,
            )
            .filter(
                or_(
                    StudyCurriculum.course_code.ilike(reference),
                    StudyCurriculum.course_name.ilike(reference),
                )
            )
            .filter(
                func.lower(CurriculumPlan.curriculum_code)
                == curriculum_code.strip().lower()
            )
            .filter(StudyCurriculum.is_active.is_(True))
        )

        if career:
            query = query.filter(
                func.lower(CurriculumPlan.career)
                == career.strip().lower()
            )

        return query.first()

    def get_prerequisite_rows(
        self,
        course_id: int,
    ):
        prerequisite_course = aliased(
            StudyCurriculum,
        )

        return (
            self.db.query(
                CurriculumPrerequisite,
                prerequisite_course,
            )
            .outerjoin(
                prerequisite_course,
                CurriculumPrerequisite.prerequisite_course_id
                == prerequisite_course.id,
            )
            .filter(
                CurriculumPrerequisite.course_id == course_id
            )
            .order_by(
                prerequisite_course.cycle.asc(),
                prerequisite_course.course_code.asc(),
            )
            .all()
        )

    def get_prerequisite_labels_by_course_ids(
        self,
        course_ids: list[int],
    ) -> dict[int, list[str]]:
        if not course_ids:
            return {}

        prerequisite_course = aliased(
            StudyCurriculum,
        )

        rows = (
            self.db.query(
                CurriculumPrerequisite.course_id,
                CurriculumPrerequisite.external_requirement,
                prerequisite_course.course_code,
            )
            .outerjoin(
                prerequisite_course,
                CurriculumPrerequisite.prerequisite_course_id
                == prerequisite_course.id,
            )
            .filter(
                CurriculumPrerequisite.course_id.in_(
                    course_ids
                )
            )
            .all()
        )

        result: dict[int, list[str]] = {
            course_id: []
            for course_id in course_ids
        }

        for (
            course_id,
            external_requirement,
            prerequisite_code,
        ) in rows:
            label = (
                prerequisite_code
                or external_requirement
            )

            if label:
                result.setdefault(
                    course_id,
                    [],
                ).append(label)

        return result

    def get_courses_unlocked_by_course(
        self,
        course_id: int,
    ):
        return (
            self.db.query(StudyCurriculum)
            .join(
                CurriculumPrerequisite,
                CurriculumPrerequisite.course_id
                == StudyCurriculum.id,
            )
            .filter(
                CurriculumPrerequisite.prerequisite_course_id
                == course_id
            )
            .filter(StudyCurriculum.is_active.is_(True))
            .order_by(
                StudyCurriculum.cycle.asc(),
                StudyCurriculum.course_code.asc(),
            )
            .all()
        )

    def get_specialization_area(
        self,
        area_reference: str,
    ):
        reference = area_reference.strip()

        return (
            self.db.query(SpecializationArea)
            .filter(SpecializationArea.is_active.is_(True))
            .filter(
                or_(
                    func.lower(SpecializationArea.code)
                    == reference.lower(),
                    func.lower(SpecializationArea.name)
                    == reference.lower(),
                )
            )
            .first()
        )

    def get_specialization_courses(
        self,
        specialization_area_id: int,
        career: str,
        curriculum_code: str = "C2",
    ):
        return (
            self.db.query(
                StudyCurriculum,
                CurriculumCourseSpecialization,
            )
            .join(
                CurriculumCourseSpecialization,
                CurriculumCourseSpecialization.course_id
                == StudyCurriculum.id,
            )
            .join(
                CurriculumPlan,
                StudyCurriculum.curriculum_plan_id
                == CurriculumPlan.id,
            )
            .filter(
                CurriculumCourseSpecialization.specialization_area_id
                == specialization_area_id
            )
            .filter(
                func.lower(CurriculumPlan.career)
                == career.strip().lower()
            )
            .filter(
                func.lower(CurriculumPlan.curriculum_code)
                == curriculum_code.strip().lower()
            )
            .filter(CurriculumPlan.is_active.is_(True))
            .filter(StudyCurriculum.is_active.is_(True))
            .order_by(
                StudyCurriculum.cycle.asc(),
                CurriculumCourseSpecialization.relevance_level.desc(),
                StudyCurriculum.course_code.asc(),
            )
            .all()
        )

    def get_certifications(
        self,
        area: str | None = None,
    ):
        query = self.db.query(Certification)

        if area:
            query = query.filter(
                Certification.area.ilike(
                    f"%{area.strip()}%"
                )
            )

        return query.order_by(
            Certification.title.asc(),
        ).all()

    def get_learning_routes_by_user(
        self,
        user_id: int,
    ):
        return (
            self.db.query(LearningRoute)
            .filter(LearningRoute.user_id == user_id)
            .order_by(
                LearningRoute.created_at.desc()
            )
            .all()
        )

    def get_learning_platforms(
        self,
        area: str | None = None,
    ):
        query = (
            self.db.query(LearningPlatform)
            .filter(
                LearningPlatform.is_active.is_(True)
            )
        )

        if area:
            query = query.filter(
                LearningPlatform.areas.any(
                    area.strip().lower()
                )
            )

        return query.order_by(
            LearningPlatform.name.asc(),
        ).all()