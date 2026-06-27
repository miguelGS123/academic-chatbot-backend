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