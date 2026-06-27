from fastapi import FastAPI

from app.config.settings import settings
from app.routes.payment_route import router as payment_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(
    payment_router,
    prefix=settings.API_V1_PREFIX,
)


@app.get("/")
def root():
    return {
        "service": "payments-service",
        "status": "running",
        "docs": "/docs",
    }