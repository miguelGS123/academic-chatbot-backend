from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, Field


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


class PayPaymentRequest(BaseModel):
    payment_method_code: str = Field(default="card", min_length=2, max_length=50)
    card_holder: str = Field(..., min_length=3, max_length=120)
    card_last_four: str = Field(..., min_length=4, max_length=4)
    confirmation_note: str | None = Field(default=None, max_length=250)


class PayPaymentResponse(BaseModel):
    payment_id: int
    user_id: int
    amount_paid: Decimal
    operation_code: str
    paid_at: datetime
    status: str
    message: str