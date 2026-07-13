from fastapi import APIRouter, UploadFile, File, HTTPException
import logging
from app.models.face_verification import FaceVerificationResponse
from app.services.face_verification_service import face_service
from app.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/jpg"}

@router.post("/verify", response_model=FaceVerificationResponse)
async def verify_face(
    reference_image: UploadFile = File(...),
    live_image: UploadFile = File(...)
):
    """
    Compares a reference ID photo with a live selfie image to determine if they match.
    """
    if reference_image.content_type not in ALLOWED_MIME_TYPES or live_image.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG and PNG are supported.")
        
    try:
        ref_bytes = await reference_image.read()
        live_bytes = await live_image.read()
        
        # Extract embeddings
        ref_emb = face_service.get_embedding(ref_bytes)
        live_emb = face_service.get_embedding(live_bytes)
        
        # Compute similarity
        score = face_service.compute_similarity(ref_emb, live_emb)
        match = score >= settings.face_match_threshold
        confidence = face_service.get_confidence_level(score, settings.face_match_threshold)
        
        return FaceVerificationResponse(
            match=match,
            score=score,
            threshold=settings.face_match_threshold,
            confidence=confidence
        )
    except ValueError as e:
        logger.warning(f"Validation error during verification: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error during verification: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during face verification.")
