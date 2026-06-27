from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.payment_schema import (
    AccountSummaryResponse,
    PaymentHistoryResponse,
    PaymentResponse,
)
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.get("/health")
def health():
    return {
        "service": "payments-service",
        "status": "healthy",
    }


@router.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT 1 AS ok")).mappings().first()

    return {
        "database": "connected",
        "result": dict(result) if result else None,
    }


@router.get("/pending/{user_id}", response_model=list[PaymentResponse])
def get_pending_payments(
    user_id: int,
    academic_period_code: str | None = Query(
        None,
        description="Código del periodo académico. Ejemplo: 202601",
    ),
    db: Session = Depends(get_db),
):
    service = PaymentService(db)

    return service.get_pending_payments(
        user_id=user_id,
        academic_period_code=academic_period_code,
    )


@router.get("/overdue/{user_id}", response_model=list[PaymentResponse])
def get_overdue_payments(
    user_id: int,
    academic_period_code: str | None = Query(
        None,
        description="Código del periodo académico. Ejemplo: 202601",
    ),
    db: Session = Depends(get_db),
):
    service = PaymentService(db)

    return service.get_overdue_payments(
        user_id=user_id,
        academic_period_code=academic_period_code,
    )


@router.get("/history/{user_id}", response_model=list[PaymentHistoryResponse])
def get_payment_history(
    user_id: int,
    academic_period_code: str | None = Query(
        None,
        description="Código del periodo académico. Ejemplo: 202601",
    ),
    db: Session = Depends(get_db),
):
    service = PaymentService(db)

    return service.get_payment_history(
        user_id=user_id,
        academic_period_code=academic_period_code,
    )


@router.get("/summary/{user_id}", response_model=AccountSummaryResponse)
def get_account_summary(
    user_id: int,
    academic_period_code: str | None = Query(
        None,
        description="Código del periodo académico. Ejemplo: 202601",
    ),
    db: Session = Depends(get_db),
):
    service = PaymentService(db)

    return service.get_account_summary(
        user_id=user_id,
        academic_period_code=academic_period_code,
    )
