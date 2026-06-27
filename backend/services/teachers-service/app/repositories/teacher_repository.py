from sqlalchemy import text
from sqlalchemy.orm import Session

from app.models.teacher_model import Teacher, TeacherCourse, TeacherProfile


class TeacherRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all_teachers(self):
        return (
            self.db.query(Teacher)
            .filter(Teacher.is_active.is_(True))
            .order_by(Teacher.full_name.asc())
            .all()
        )

    def get_teacher_by_id(self, teacher_id: int):
        return (
            self.db.query(Teacher)
            .filter(Teacher.id == teacher_id)
            .first()
        )

    def get_teacher_by_name_or_email(self, reference: str):
        search = reference.strip()

        return (
            self.db.query(Teacher)
            .filter(
                (Teacher.full_name.ilike(f"%{search}%"))
                | (Teacher.email.ilike(search))
            )
            .first()
        )

    def get_teacher_profile(self, teacher_id: int):
        return (
            self.db.query(TeacherProfile)
            .filter(TeacherProfile.teacher_id == teacher_id)
            .first()
        )

    def get_teacher_courses(
        self,
        teacher_id: int,
        academic_period: str | None = None,
    ):
        query = """
            SELECT
                tc.teacher_id,
                t.full_name AS teacher_name,
                t.email AS teacher_email,
                c.id AS course_id,
                c.course_code,
                c.course_name,
                cs.section_code,
                tc.academic_period,
                tc.role
            FROM teacher_courses tc
            JOIN teachers t ON t.id = tc.teacher_id
            JOIN courses c ON c.id = tc.course_id
            LEFT JOIN course_sections cs ON cs.id = tc.course_section_id
            WHERE tc.teacher_id = :teacher_id
        """

        params = {
            "teacher_id": teacher_id,
        }

        if academic_period:
            query += " AND tc.academic_period = :academic_period"
            params["academic_period"] = academic_period

        query += " ORDER BY c.course_name ASC"

        return self.db.execute(
            text(query),
            params,
        ).mappings().all()

    def get_teachers_by_user_courses(
        self,
        user_id: int,
        academic_period: str | None = None,
    ):
        query = """
            SELECT DISTINCT
                tc.teacher_id,
                t.full_name AS teacher_name,
                t.email AS teacher_email,
                c.id AS course_id,
                c.course_code,
                c.course_name,
                cs.section_code,
                tc.academic_period,
                tc.role
            FROM student_courses sc
            JOIN courses c ON c.id = sc.course_id
            LEFT JOIN course_sections cs ON cs.id = sc.course_section_id
            JOIN teacher_courses tc
                ON tc.course_id = c.id
                AND (
                    tc.course_section_id = sc.course_section_id
                    OR tc.course_section_id IS NULL
                )
            JOIN teachers t ON t.id = tc.teacher_id
            WHERE sc.user_id = :user_id
        """

        params = {
            "user_id": user_id,
        }

        if academic_period:
            query += " AND sc.academic_period = :academic_period"
            params["academic_period"] = academic_period

        query += " ORDER BY c.course_name ASC"

        return self.db.execute(
            text(query),
            params,
        ).mappings().all()