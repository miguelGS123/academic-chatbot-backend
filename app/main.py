from fastapi import FastAPI

from app.config.settings import settings

from app.routes.user_route import (
    router as user_router
)

from app.routes.test_route import (
    router as test_router
)

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0"
)

app.include_router(user_router)

app.include_router(test_router)


@app.get("/")
def root():
    return {
        "message": "Backend running successfully"
    }