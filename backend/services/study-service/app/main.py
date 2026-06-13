from fastapi import FastAPI

from app.config.settings import settings
from app.routes.study_route import router as study_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(
    study_router,
    prefix=settings.API_V1_PREFIX,
)


@app.get("/")
def root():
    return {
        "service": "study-service",
        "status": "running",
        "docs": "/docs",
    }