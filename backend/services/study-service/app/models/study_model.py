from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.sql import func

from app.db.database import Base


class CurriculumPlan(Base):
    __tablename__ = "curriculum_plans"

    id = Column(BigInteger, primary_key=True, index=True)
    career = Column(String(150), nullable=False)
    curriculum_code = Column(String(30), nullable=False)
    version = Column(String(20), nullable=True)
    source_name = Column(String(150), nullable=True)
    source_date = Column(Date, nullable=True)
    is_official = Column(Boolean, nullable=False, default=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )


class StudyCurriculum(Base):
    __tablename__ = "study_curriculum"

    id = Column(BigInteger, primary_key=True, index=True)

    curriculum_plan_id = Column(
        BigInteger,
        ForeignKey(
            "curriculum_plans.id",
            ondelete="CASCADE",
        ),
        nullable=True,
        index=True,
    )

    career = Column(String(150), nullable=False)
    cycle = Column(Integer, nullable=False)
    course_code = Column(String(30), nullable=False)
    course_name = Column(String(200), nullable=False)
    credits = Column(Integer, nullable=False, default=0)
    course_type = Column(String(100), nullable=True)
    modality = Column(String(50), nullable=True)

    # Se conserva por compatibilidad con la estructura anterior.
    # Los nuevos prerrequisitos se consultarán desde
    # curriculum_prerequisites.
    prerequisites = Column(
        ARRAY(Text),
        nullable=True,
    )

    is_elective = Column(
        Boolean,
        nullable=False,
        default=False,
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )


class CurriculumPrerequisite(Base):
    __tablename__ = "curriculum_prerequisites"

    id = Column(BigInteger, primary_key=True, index=True)

    course_id = Column(
        BigInteger,
        ForeignKey(
            "study_curriculum.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    prerequisite_course_id = Column(
        BigInteger,
        ForeignKey(
            "study_curriculum.id",
            ondelete="CASCADE",
        ),
        nullable=True,
        index=True,
    )

    external_requirement = Column(
        String(100),
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )


class SpecializationArea(Base):
    __tablename__ = "specialization_areas"

    id = Column(BigInteger, primary_key=True, index=True)
    code = Column(String(50), nullable=False, unique=True)
    name = Column(String(120), nullable=False)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )


class CurriculumCourseSpecialization(Base):
    __tablename__ = "curriculum_course_specializations"

    id = Column(BigInteger, primary_key=True, index=True)

    course_id = Column(
        BigInteger,
        ForeignKey(
            "study_curriculum.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    specialization_area_id = Column(
        BigInteger,
        ForeignKey(
            "specialization_areas.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    relevance_level = Column(Integer, nullable=False)
    justification = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )


class LearningRoute(Base):
    __tablename__ = "learning_routes"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    title = Column(String(200), nullable=False)
    objective = Column(Text, nullable=True)
    recommended_path = Column(JSONB, nullable=True)
    ai_summary = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(BigInteger, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    provider = Column(String(150), nullable=True)
    area = Column(String(100), nullable=False)
    level = Column(String(50), nullable=True)
    duration = Column(String(100), nullable=True)
    url = Column(Text, nullable=True)
    is_free = Column(Boolean, default=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )