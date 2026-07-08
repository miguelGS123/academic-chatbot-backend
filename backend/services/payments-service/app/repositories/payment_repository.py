from datetime import datetime
from decimal import Decimal

from sqlalchemy.orm import Session

from app.models.payment_model import (
    AcademicPeriod,
    Payment,
    PaymentHistory,
    PaymentMethod,
    PaymentType,
)


class PaymentRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_academic_period_by_code(self, academic_period_code: str):
        return (
            self.db.query(AcademicPeriod)
            .filter(AcademicPeriod.code == academic_period_code)
            .first()
        )

    def get_active_academic_period(self):
        return (
            self.db.query(AcademicPeriod)
            .filter(AcademicPeriod.status == "active")
            .order_by(AcademicPeriod.start_date.desc())
            .first()
        )

    def get_user_payments(
        self,
        user_id: int,
        academic_period_code: str | None = None,
    ):
        query = (
            self.db.query(Payment, AcademicPeriod, PaymentType)
            .outerjoin(AcademicPeriod, Payment.academic_period_id == AcademicPeriod.id)
            .outerjoin(PaymentType, Payment.payment_type_id == PaymentType.id)
            .filter(Payment.user_id == user_id)
        )

        if academic_period_code:
            query = query.filter(AcademicPeriod.code == academic_period_code)

        return query.order_by(Payment.due_date.asc()).all()

    def get_payment_by_id(self, payment_id: int):
        return (
            self.db.query(Payment)
            .filter(Payment.id == payment_id)
            .first()
        )

    def get_payment_method_by_code(self, code: str):
        return (
            self.db.query(PaymentMethod)
            .filter(PaymentMethod.code == code)
            .first()
        )

    def get_default_payment_method(self):
        return (
            self.db.query(PaymentMethod)
            .filter(PaymentMethod.is_active.is_(True))
            .order_by(PaymentMethod.id.asc())
            .first()
        )

    def get_payment_history(
        self,
        user_id: int,
        academic_period_code: str | None = None,
    ):
        query = (
            self.db.query(PaymentHistory, PaymentMethod, Payment, AcademicPeriod)
            .outerjoin(PaymentMethod, PaymentHistory.payment_method_id == PaymentMethod.id)
            .outerjoin(Payment, PaymentHistory.payment_id == Payment.id)
            .outerjoin(AcademicPeriod, Payment.academic_period_id == AcademicPeriod.id)
            .filter(PaymentHistory.user_id == user_id)
        )

        if academic_period_code:
            query = query.filter(AcademicPeriod.code == academic_period_code)

        return query.order_by(PaymentHistory.paid_at.desc()).all()

    def get_paid_payment_ids(self, user_id: int):
        rows = (
            self.db.query(PaymentHistory.payment_id)
            .filter(PaymentHistory.user_id == user_id)
            .filter(PaymentHistory.status == "paid")
            .all()
        )

        return {row.payment_id for row in rows if row.payment_id is not None}

    def create_payment_history(
        self,
        user_id: int,
        payment_id: int,
        amount_paid: Decimal,
        operation_code: str,
        payment_method_id: int | None,
    ):
        history = PaymentHistory(
            user_id=user_id,
            payment_id=payment_id,
            amount_paid=amount_paid,
            paid_at=datetime.now(),
            operation_code=operation_code,
            receipt_url=None,
            status="paid",
            payment_method_id=payment_method_id,
        )

        self.db.add(history)
        return history

    def mark_payment_as_paid(self, payment: Payment):
        payment.status = "paid"
        self.db.add(payment)
        return payment

    def commit(self):
        self.db.commit()

    def refresh(self, instance):
        self.db.refresh(instance)