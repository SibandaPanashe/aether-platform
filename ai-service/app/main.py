from fastapi import FastAPI
from app.api.face_verification import router as face_router
from app.config import settings
import logging

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

app = FastAPI(
    title=settings.project_name,
    openapi_url=f"{settings.api_v1_prefix}/openapi.json"
)

app.include_router(face_router, prefix=f"{settings.api_v1_prefix}/face", tags=["Face Verification"])

@app.get("/health", tags=["Health"])
def health_check():
    """
    Health check endpoint to verify service availability.
    """
    return {"status": "ok"}
