from sqlalchemy import Boolean, BigInteger, Column, DateTime, Integer, String, Text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.sql import func

from app.db.database import Base


class LearningPlatform(Base):
    __tablename__ = "learning_platforms"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    provider = Column(String(150), nullable=True)
    base_url = Column(Text, nullable=False)
    areas = Column(ARRAY(Text), nullable=False)
    description = Column(Text, nullable=True)
    certificate_info = Column(Text, nullable=True)
    search_hint = Column(Text, nullable=True)
    recommended_cycle_min = Column(Integer, default=1)
    recommended_cycle_max = Column(Integer, default=10)
    is_free = Column(Boolean, default=True)
    has_certificate = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())