import cv2
import numpy as np
from insightface.app import FaceAnalysis
from numpy.linalg import norm
import logging
from app.models.face_verification import ConfidenceLevel

logger = logging.getLogger(__name__)

class FaceVerificationService:
    def __init__(self):
        # Initialize the FaceAnalysis app for embedding extraction
        # Using buffalo_l, a robust model for face detection and recognition
        logger.info("Initializing InsightFace model...")
        try:
            self.app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
            self.app.prepare(ctx_id=0, det_size=(640, 640))
            logger.info("InsightFace model initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize InsightFace model: {e}")
            raise e
        
    def get_embedding(self, image_bytes: bytes) -> np.ndarray:
        """
        Extracts face embedding from image bytes.
        """
        # Decode image from bytes
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Invalid image format or corrupted image")
        
        # Detect faces and extract embeddings
        faces = self.app.get(img)
        if len(faces) == 0:
            raise ValueError("No face detected in the image")
        
        # If multiple faces are detected, select the largest one based on bounding box area
        if len(faces) > 1:
            faces = sorted(
                faces, 
                key=lambda x: (x.bbox[2] - x.bbox[0]) * (x.bbox[3] - x.bbox[1]), 
                reverse=True
            )
            
        return faces[0].embedding
        
    def compute_similarity(self, emb1: np.ndarray, emb2: np.ndarray) -> float:
        """
        Computes cosine similarity between two face embeddings.
        """
        sim = np.dot(emb1, emb2) / (norm(emb1) * norm(emb2))
        return float(sim)
        
    def get_confidence_level(self, score: float, threshold: float) -> ConfidenceLevel:
        """
        Determines the qualitative confidence level of the match.
        """
        if score < threshold:
            if score < threshold - 0.15:
                return ConfidenceLevel.NONE
            return ConfidenceLevel.LOW
        if score >= threshold + 0.1:
            return ConfidenceLevel.HIGH
        return ConfidenceLevel.MEDIUM

# Singleton instance to avoid reloading the model for every request
face_service = FaceVerificationService()
