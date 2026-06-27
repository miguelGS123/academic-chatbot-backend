from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    Time,
)
from sqlalchemy.sql import func

from app.db.database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(BigInteger, primary_key=True, index=True)
    course_code = Column(String(20), unique=True, nullable=False)
    course_name = Column(String(200), nullable=False)
    career = Column(String(150), nullable=False)
    cycle = Column(Integer, nullable=False)
    credits = Column(Integer, default=0)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CourseSection(Base):
    __tablename__ = "course_sections"

    id = Column(BigInteger, primary_key=True, index=True)
    course_id = Column(
        BigInteger,
        ForeignKey("courses.id", ondelete="CASCADE"),
        nullable=False,
    )
    section_code = Column(String(20), nullable=False)
    academic_period = Column(String(20), nullable=False)
    teacher_name = Column(String(200), nullable=True)
    capacity = Column(Integer, nullable=True)
    enrolled_count = Column(Integer, default=0)
    modality = Column(String(50), nullable=True)
    campus = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class StudentCourse(Base):
    __tablename__ = "student_courses"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, nullable=False)
    course_id = Column(
        BigInteger,
        ForeignKey("courses.id", ondelete="CASCADE"),
        nullable=False,
    )
    course_section_id = Column(
        BigInteger,
        ForeignKey("course_sections.id", ondelete="SET NULL"),
        nullable=True,
    )
    academic_period = Column(String(20), nullable=True)
    status = Column(String(30), default="enrolled")
    final_grade = Column(Numeric(5, 2), nullable=True)
    attendance_percentage = Column(Numeric(5, 2), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CourseSchedule(Base):
    __tablename__ = "course_schedules"

    id = Column(BigInteger, primary_key=True, index=True)
    course_id = Column(
        BigInteger,
        ForeignKey("courses.id", ondelete="CASCADE"),
        nullable=False,
    )
    course_section_id = Column(
        BigInteger,
        ForeignKey("course_sections.id", ondelete="CASCADE"),
        nullable=True,
    )
    day_of_week = Column(String(20), nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    classroom = Column(String(100), nullable=True)
    modality = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CourseSyllabus(Base):
    __tablename__ = "course_syllabus"

    id = Column(BigInteger, primary_key=True, index=True)
    course_id = Column(
        BigInteger,
        ForeignKey("courses.id", ondelete="CASCADE"),
        nullable=False,
    )
    topic = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    week_number = Column(Integer, nullable=True)
    resource_url = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())