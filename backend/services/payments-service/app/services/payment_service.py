from datetime import date
from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.payment_repository import PaymentRepository


class PaymentService:
    def __init__(self, db: Session):
        self.repository = PaymentRepository(db)

    def get_pending_payments(
        self,
        user_id: int,
        academic_period_code: str | None = None,
    ):
        payments = self._build_payment_responses(
            user_id=user_id,
            academic_period_code=academic_period_code,
        )

        return [
            payment
            for payment in payments
            if payment["calculated_status"] == "pending"
        ]

    def get_overdue_payments(
        self,
        user_id: int,
        academic_period_code: str | None = None,
    ):
        payments = self._build_payment_responses(
            user_id=user_id,
            academic_period_code=academic_period_code,
        )

        return [
            payment
            for payment in payments
            if payment["calculated_status"] == "overdue"
        ]

    def get_payment_history(
        self,
        user_id: int,
        academic_period_code: str | None = None,
    ):
        rows = self.repository.get_payment_history(
            user_id=user_id,
            academic_period_code=academic_period_code,
        )

        result = []

        for history, method, _payment, _period in rows:
            result.append(
                {
                    "id": history.id,
                    "user_id": history.user_id,
                    "payment_id": history.payment_id,
                    "amount_paid": history.amount_paid,
                    "paid_at": history.paid_at,
                    "operation_code": history.operation_code,
                    "receipt_url": history.receipt_url,
                    "status": history.status,
                    "payment_method": method.name if method else None,
                }
            )

        return result

    def get_account_summary(
        self,
        user_id: int,
        academic_period_code: str | None = None,
    ):
        period = None

        if academic_period_code:
            period = self.repository.get_academic_period_by_code(
                academic_period_code
            )
        else:
            period = self.repository.get_active_academic_period()

        resolved_period_code = period.code if period else academic_period_code

        payments = self._build_payment_responses(
            user_id=user_id,
            academic_period_code=resolved_period_code,
        )

        payment_history = self.get_payment_history(
            user_id=user_id,
            academic_period_code=resolved_period_code,
        )

        pending_payments = [
            payment
            for payment in payments
            if payment["calculated_status"] == "pending"
        ]

        overdue_payments = [
            payment
            for payment in payments
            if payment["calculated_status"] == "overdue"
        ]

        total_paid = sum(
            Decimal(str(item["amount_paid"]))
            for item in payment_history
            if item["status"] == "paid"
        )

        total_pending = sum(
            Decimal(str(item["amount"]))
            for item in pending_payments
        )

        total_overdue = sum(
            Decimal(str(item["amount"]))
            for item in overdue_payments
        )

        cycle_total_amount = sum(
            Decimal(str(item["amount"]))
            for item in payments
        )

        next_payment = None

        if pending_payments:
            next_payment = sorted(
                pending_payments,
                key=lambda item: item["due_date"] or date.max,
            )[0]

        financial_status = self._resolve_financial_status(
            total_pending=total_pending,
            total_overdue=total_overdue,
        )

        return {
            "user_id": user_id,
            "academic_period_code": period.code if period else resolved_period_code,
            "academic_period_name": period.name if period else None,
            "cycle_total_amount": cycle_total_amount,
            "total_paid": total_paid,
            "total_pending": total_pending,
            "total_overdue": total_overdue,
            "next_payment_concept": next_payment["concept"] if next_payment else None,
            "next_payment_amount": next_payment["amount"] if next_payment else None,
            "next_payment_due_date": next_payment["due_date"] if next_payment else None,
            "financial_status": financial_status,
            "pending_payments": pending_payments,
            "overdue_payments": overdue_payments,
            "payment_history": payment_history,
        }

    def pay_payment(
        self,
        payment_id: int,
        payment_method_code: str,
    ):
        payment = self.repository.get_payment_by_id(payment_id=payment_id)

        if not payment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Pago no encontrado.",
            )

        paid_payment_ids = self.repository.get_paid_payment_ids(
            user_id=payment.user_id,
        )

        if payment.id in paid_payment_ids or payment.status == "paid":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Este pago ya fue registrado como pagado.",
            )

        method = self.repository.get_payment_method_by_code(payment_method_code)

        if not method:
            method = self.repository.get_default_payment_method()

        operation_code = self._generate_operation_code(payment_id=payment.id)

        history = self.repository.create_payment_history(
            user_id=payment.user_id,
            payment_id=payment.id,
            amount_paid=payment.amount,
            operation_code=operation_code,
            payment_method_id=method.id if method else None,
        )

        self.repository.mark_payment_as_paid(payment)
        self.repository.commit()
        self.repository.refresh(history)

        return {
            "payment_id": payment.id,
            "user_id": payment.user_id,
            "amount_paid": history.amount_paid,
            "operation_code": history.operation_code,
            "paid_at": history.paid_at,
            "status": history.status,
            "message": "Pago registrado correctamente.",
        }

    def _build_payment_responses(
        self,
        user_id: int,
        academic_period_code: str | None = None,
    ):
        rows = self.repository.get_user_payments(
            user_id=user_id,
            academic_period_code=academic_period_code,
        )

        paid_payment_ids = self.repository.get_paid_payment_ids(user_id=user_id)

        result = []

        for payment, period, payment_type in rows:
            calculated_status = self._calculate_payment_status(
                payment_id=payment.id,
                due_date=payment.due_date,
                paid_payment_ids=paid_payment_ids,
            )

            days_overdue = None
            days_until_due = None

            if payment.due_date:
                today = date.today()

                if calculated_status == "overdue":
                    days_overdue = (today - payment.due_date).days

                if calculated_status == "pending":
                    days_until_due = (payment.due_date - today).days

            result.append(
                {
                    "id": payment.id,
                    "user_id": payment.user_id,
                    "concept": payment.concept,
                    "amount": payment.amount,
                    "due_date": payment.due_date,
                    "stored_status": payment.status,
                    "calculated_status": calculated_status,
                    "academic_period_code": period.code if period else payment.academic_period,
                    "academic_period_name": period.name if period else None,
                    "payment_type": payment_type.name if payment_type else None,
                    "days_overdue": days_overdue,
                    "days_until_due": days_until_due,
                }
            )

        return result

    def _calculate_payment_status(
        self,
        payment_id: int,
        due_date,
        paid_payment_ids: set[int],
    ) -> str:
        if payment_id in paid_payment_ids:
            return "paid"

        if due_date and due_date < date.today():
            return "overdue"

        return "pending"

    def _resolve_financial_status(
        self,
        total_pending: Decimal,
        total_overdue: Decimal,
    ) -> str:
        if total_overdue > 0:
            return "Tienes pagos vencidos."

        if total_pending > 0:
            return "Tienes pagos pendientes, pero aún no vencidos."

        return "Estás al día con tus pagos."

    def _generate_operation_code(self, payment_id: int) -> str:
        today = date.today().strftime("%Y%m%d")
        return f"PAY-{today}-{payment_id}"