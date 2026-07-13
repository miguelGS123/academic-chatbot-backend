import unicodedata
from collections import defaultdict

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.study_repository import StudyRepository


class StudyService:
    SPECIALIZATION_ALIASES = {
        "ia": "artificial_intelligence",
        "ai": "artificial_intelligence",
        "inteligencia artificial": "artificial_intelligence",
        "machine learning": "artificial_intelligence",
        "aprendizaje automatico": "artificial_intelligence",
        "data science": "data_science",
        "ciencia de datos": "data_science",
        "datos": "data_science",
        "devops": "devops",
        "cloud": "cloud",
        "nube": "cloud",
        "cloud computing": "cloud",
        "ciberseguridad": "cybersecurity",
        "seguridad": "cybersecurity",
        "cybersecurity": "cybersecurity",
        "backend": "backend",
        "desarrollo backend": "backend",
        "arquitectura": "software_architecture",
        "arquitectura de software": "software_architecture",
        "gestion de proyectos": "project_management",
        "gestion ti": "project_management",
    }

    def __init__(self, db: Session):
        self.repository = StudyRepository(db)

    def get_curriculum(
        self,
        career: str,
        cycle: int | None = None,
        curriculum_code: str = "C2",
    ):
        self._validate_cycle(cycle)

        courses = self.repository.get_curriculum(
            career=career,
            cycle=cycle,
            curriculum_code=curriculum_code,
        )

        prerequisite_map = (
            self.repository
            .get_prerequisite_labels_by_course_ids(
                [course.id for course in courses]
            )
        )

        return [
            self._serialize_course(
                course,
                prerequisite_map.get(
                    course.id,
                    [],
                ),
            )
            for course in courses
        ]

    def get_full_curriculum(
        self,
        career: str,
        curriculum_code: str = "C2",
    ):
        plan = self.repository.get_curriculum_plan(
            career=career,
            curriculum_code=curriculum_code,
        )

        if not plan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontró el plan curricular solicitado.",
            )

        courses = self.repository.get_curriculum(
            career=career,
            curriculum_code=curriculum_code,
        )

        prerequisite_map = (
            self.repository
            .get_prerequisite_labels_by_course_ids(
                [course.id for course in courses]
            )
        )

        grouped_courses: dict[int, list[dict]] = defaultdict(
            list
        )

        for course in courses:
            grouped_courses[course.cycle].append(
                self._serialize_course(
                    course,
                    prerequisite_map.get(
                        course.id,
                        [],
                    ),
                )
            )

        cycles = [
            {
                "cycle": cycle,
                "total_courses": len(
                    grouped_courses[cycle]
                ),
                "courses": grouped_courses[cycle],
            }
            for cycle in sorted(grouped_courses)
        ]

        return {
            "curriculum_plan_id": plan.id,
            "career": plan.career,
            "curriculum_code": plan.curriculum_code,
            "version": plan.version,
            "source_name": plan.source_name,
            "source_date": plan.source_date,
            "is_official": plan.is_official,
            "total_courses": len(courses),
            "cycles": cycles,
        }

    def get_next_cycle_courses(
        self,
        user_id: int,
    ):
        user = self.repository.get_user_by_id(
            user_id
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado.",
            )

        if not user.career or not user.cycle:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "El usuario no tiene carrera "
                    "o ciclo registrado."
                ),
            )

        next_cycle = user.cycle + 1

        if next_cycle > 10:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "El estudiante ya se encuentra "
                    "en el último ciclo."
                ),
            )

        courses = self.get_curriculum(
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

    def get_course_prerequisites(
        self,
        course_reference: str,
        career: str | None = None,
        curriculum_code: str = "C2",
    ):
        course = self.repository.get_course_by_code_or_name(
            course_reference=course_reference,
            career=career,
            curriculum_code=curriculum_code,
        )

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=(
                    "Curso no encontrado. Ingresa el "
                    "código o nombre exacto del curso."
                ),
            )

        rows = self.repository.get_prerequisite_rows(
            course_id=course.id
        )

        prerequisite_courses = []
        external_requirements = []
        prerequisite_labels = []

        for prerequisite, prerequisite_course in rows:
            if prerequisite_course:
                prerequisite_courses.append(
                    self._serialize_course(
                        prerequisite_course,
                        [],
                    )
                )
                prerequisite_labels.append(
                    prerequisite_course.course_code
                )

            if prerequisite.external_requirement:
                external_requirements.append(
                    prerequisite.external_requirement
                )
                prerequisite_labels.append(
                    prerequisite.external_requirement
                )

        return {
            "course": self._serialize_course(
                course,
                prerequisite_labels,
            ),
            "prerequisite_courses": prerequisite_courses,
            "external_requirements": external_requirements,
        }

    def get_course_unlocks(
        self,
        course_reference: str,
        career: str | None = None,
        curriculum_code: str = "C2",
    ):
        course = self.repository.get_course_by_code_or_name(
            course_reference=course_reference,
            career=career,
            curriculum_code=curriculum_code,
        )

        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=(
                    "Curso no encontrado. Ingresa el "
                    "código o nombre exacto del curso."
                ),
            )

        unlocked_courses = (
            self.repository
            .get_courses_unlocked_by_course(
                course_id=course.id
            )
        )

        prerequisite_map = (
            self.repository
            .get_prerequisite_labels_by_course_ids(
                [
                    unlocked_course.id
                    for unlocked_course
                    in unlocked_courses
                ]
            )
        )

        return {
            "course": self._serialize_course(
                course,
                [],
            ),
            "unlocked_courses": [
                self._serialize_course(
                    unlocked_course,
                    prerequisite_map.get(
                        unlocked_course.id,
                        [],
                    ),
                )
                for unlocked_course
                in unlocked_courses
            ],
        }

    def get_specialization_path(
        self,
        area: str,
        career: str,
        curriculum_code: str = "C2",
    ):
        specialization_code = (
            self._resolve_specialization_code(
                area
            )
        )

        specialization = (
            self.repository.get_specialization_area(
                specialization_code
            )
        )

        if not specialization:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=(
                    "No se encontró el área de "
                    "especialización solicitada."
                ),
            )

        plan = self.repository.get_curriculum_plan(
            career=career,
            curriculum_code=curriculum_code,
        )

        if not plan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontró el plan curricular solicitado.",
            )

        rows = self.repository.get_specialization_courses(
            specialization_area_id=specialization.id,
            career=career,
            curriculum_code=curriculum_code,
        )

        courses = [
            {
                "course_id": course.id,
                "course_code": course.course_code,
                "course_name": course.course_name,
                "cycle": course.cycle,
                "credits": course.credits,
                "modality": course.modality,
                "relevance_level": relation.relevance_level,
                "justification": relation.justification,
            }
            for course, relation in rows
        ]

        return {
            "specialization_code": specialization.code,
            "specialization_name": specialization.name,
            "description": specialization.description,
            "career": plan.career,
            "curriculum_code": plan.curriculum_code,
            "total_courses": len(courses),
            "courses": courses,
        }

    def get_certifications(
        self,
        area: str | None = None,
    ):
        return self.repository.get_certifications(
            area=area
        )

    def get_learning_routes_by_user(
        self,
        user_id: int,
    ):
        return (
            self.repository
            .get_learning_routes_by_user(
                user_id=user_id
            )
        )

    def get_learning_platforms(
        self,
        area: str | None = None,
    ):
        return (
            self.repository.get_learning_platforms(
                area=area
            )
        )

    def _serialize_course(
        self,
        course,
        prerequisites: list[str],
    ) -> dict:
        return {
            "id": course.id,
            "curriculum_plan_id": (
                course.curriculum_plan_id
            ),
            "career": course.career,
            "cycle": course.cycle,
            "course_code": course.course_code,
            "course_name": course.course_name,
            "credits": course.credits,
            "modality": course.modality,
            "course_type": course.course_type,
            "is_elective": bool(
                course.is_elective
            ),
            "prerequisites": prerequisites,
        }

    def _resolve_specialization_code(
        self,
        area: str,
    ) -> str:
        normalized_area = self._normalize_text(
            area
        )

        return self.SPECIALIZATION_ALIASES.get(
            normalized_area,
            normalized_area.replace(" ", "_"),
        )

    def _normalize_text(
        self,
        value: str,
    ) -> str:
        normalized = unicodedata.normalize(
            "NFD",
            value.lower().strip(),
        )

        return "".join(
            character
            for character in normalized
            if unicodedata.category(character)
            != "Mn"
        )

    def _validate_cycle(
        self,
        cycle: int | None,
    ) -> None:
        if cycle is None:
            return

        if cycle < 1 or cycle > 10:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="El ciclo debe estar entre 1 y 10.",
            )