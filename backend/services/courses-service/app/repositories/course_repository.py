from sqlalchemy.orm import Session

from app.models.course_model import (
    Course,
    CourseSchedule,
    CourseSyllabus,
    StudentCourse,
)


class CourseRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all_courses(
        self,
        career: str | None = None,
        cycle: int | None = None,
    ):
        query = self.db.query(Course)

        if career:
            query = query.filter(Course.career.ilike(career))

        if cycle is not None:
            query = query.filter(Course.cycle == cycle)

        return query.order_by(
            Course.cycle.asc(),
            Course.course_code.asc(),
        ).all()

    def get_course_by_id(self, course_id: int):
        return (
            self.db.query(Course)
            .filter(Course.id == course_id)
            .first()
        )

    def get_course_by_code_or_name(self, course_reference: str):
        reference = course_reference.strip()

        return (
            self.db.query(Course)
            .filter(
                (Course.course_code.ilike(reference))
                | (Course.course_name.ilike(reference))
                | (Course.course_name.ilike(f"%{reference}%"))
            )
            .order_by(Course.cycle.asc())
            .first()
        )

    def get_student_courses(self, user_id: int):
        rows = (
            self.db.query(StudentCourse, Course)
            .join(Course, StudentCourse.course_id == Course.id)
            .filter(StudentCourse.user_id == user_id)
            .order_by(Course.cycle.asc(), Course.course_code.asc())
            .all()
        )

        result = []

        for student_course, course in rows:
            result.append(
                {
                    "id": student_course.id,
                    "user_id": student_course.user_id,
                    "course_id": student_course.course_id,
                    "academic_period": student_course.academic_period,
                    "status": student_course.status,
                    "final_grade": student_course.final_grade,
                    "attendance_percentage": student_course.attendance_percentage,
                    "course": course,
                }
            )

        return result

    def get_course_schedules(self, course_id: int):
        return (
            self.db.query(CourseSchedule)
            .filter(CourseSchedule.course_id == course_id)
            .order_by(CourseSchedule.day_of_week.asc(), CourseSchedule.start_time.asc())
            .all()
        )

    def get_course_syllabus(self, course_id: int):
        return (
            self.db.query(CourseSyllabus)
            .filter(CourseSyllabus.course_id == course_id)
            .order_by(CourseSyllabus.week_number.asc())
            .all()
        )