from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
)
from sqlalchemy.sql import func

from app.db.database import Base


class AcademicPeriod(Base):
    __tablename__ = "academic_periods"

    id = Column(BigInteger, primary_key=True, index=True)
    code = Column(String(20), unique=True, nullable=False)
    name = Column(String(50), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    tuition_fee = Column(Numeric(10, 2), nullable=False, default=0)
    monthly_fee = Column(Numeric(10, 2), nullable=False, default=0)
    installments = Column(Integer, nullable=False, default=0)
    status = Column(String(30), nullable=False, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class PaymentType(Base):
    __tablename__ = "payment_types"

    id = Column(BigInteger, primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class PaymentMethod(Base):
    __tablename__ = "payment_methods"

    id = Column(BigInteger, primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Payment(Base):
    __tablename__ = "payments"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, nullable=False)
    concept = Column(String(150), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    due_date = Column(Date, nullable=True)
    status = Column(String(30), nullable=False, default="pending")
    academic_period = Column(String(20), nullable=True)
    academic_period_id = Column(
        BigInteger,
        ForeignKey("academic_periods.id", ondelete="SET NULL"),
        nullable=True,
    )
    payment_type_id = Column(
        BigInteger,
        ForeignKey("payment_types.id", ondelete="SET NULL"),
        nullable=True,
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class PaymentHistory(Base):
    __tablename__ = "payment_history"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(BigInteger, nullable=False)
    payment_id = Column(
        BigInteger,
        ForeignKey("payments.id", ondelete="SET NULL"),
        nullable=True,
    )
    amount_paid = Column(Numeric(10, 2), nullable=False)
    paid_at = Column(DateTime(timezone=True), nullable=False)
    operation_code = Column(String(100), nullable=True)
    receipt_url = Column(Text, nullable=True)
    status = Column(String(30), nullable=False, default="paid")
    payment_method_id = Column(
        BigInteger,
        ForeignKey("payment_methods.id", ondelete="SET NULL"),
        nullable=True,
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())