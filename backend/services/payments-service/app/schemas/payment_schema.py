from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel


class PaymentResponse(BaseModel):
    id: int
    user_id: int
    concept: str
    amount: Decimal
    due_date: date | None = None
    stored_status: str
    calculated_status: str
    academic_period_code: str | None = None
    academic_period_name: str | None = None
    payment_type: str | None = None
    days_overdue: int | None = None
    days_until_due: int | None = None


class PaymentHistoryResponse(BaseModel):
    id: int
    user_id: int
    payment_id: int | None = None
    amount_paid: Decimal
    paid_at: datetime
    operation_code: str | None = None
    receipt_url: str | None = None
    status: str
    payment_method: str | None = None


class AccountSummaryResponse(BaseModel):
    user_id: int
    academic_period_code: str | None = None
    academic_period_name: str | None = None
    cycle_total_amount: Decimal
    total_paid: Decimal
    total_pending: Decimal
    total_overdue: Decimal
    next_payment_concept: str | None = None
    next_payment_amount: Decimal | None = None
    next_payment_due_date: date | None = None
    financial_status: str
    pending_payments: list[PaymentResponse]
    overdue_payments: list[PaymentResponse]
    payment_history: list[PaymentHistoryResponse]