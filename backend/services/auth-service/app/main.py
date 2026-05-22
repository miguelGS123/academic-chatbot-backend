from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings

from app.routes.user_route import router as user_router
from app.routes.test_route import router as test_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_PREFIX = "/api/v1"

app.include_router(
    user_router,
    prefix=f"{API_PREFIX}/users",
    tags=["Users"]
)

app.include_router(
    test_router,
    prefix=f"{API_PREFIX}/test",
    tags=["Test"]
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "auth-service"
    }