import sys
from unittest.mock import MagicMock, patch

# Mock heavy ML and system modules before any internal imports to avoid installation overhead during tests
sys.modules['cv2'] = MagicMock()
sys.modules['insightface'] = MagicMock()
sys.modules['insightface.app'] = MagicMock()

import pytest
from fastapi.testclient import TestClient
import numpy as np
import io

from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def create_dummy_image_bytes():
    return io.BytesIO(b"dummy image bytes")

def test_verify_invalid_file_type():
    files = {
        "reference_image": ("ref.txt", b"not an image", "text/plain"),
        "live_image": ("live.txt", b"not an image", "text/plain"),
    }
    response = client.post("/api/v1/face/verify", files=files)
    assert response.status_code == 400
    assert "Invalid file type" in response.json()["detail"]

@patch("app.api.face_verification.face_service.get_embedding")
@patch("app.api.face_verification.face_service.compute_similarity")
def test_verify_success(mock_similarity, mock_embedding):
    # Mock the internal ML service calls
    mock_embedding.return_value = np.array([0.1, 0.2, 0.3])
    mock_similarity.return_value = 0.95
    
    files = {
        "reference_image": ("ref.jpg", create_dummy_image_bytes(), "image/jpeg"),
        "live_image": ("live.jpg", create_dummy_image_bytes(), "image/jpeg"),
    }
    response = client.post("/api/v1/face/verify", files=files)
    
    assert response.status_code == 200
    data = response.json()
    assert data["match"] is True
    assert data["score"] == 0.95
    assert data["confidence"] == "HIGH"

def test_verify_no_face_detected():
    # We will pass dummy images and let get_embedding raise the ValueError
    files = {
        "reference_image": ("ref.jpg", create_dummy_image_bytes(), "image/jpeg"),
        "live_image": ("live.jpg", create_dummy_image_bytes(), "image/jpeg"),
    }
    
    with patch("app.api.face_verification.face_service.get_embedding", side_effect=ValueError("No face detected in the image")):
        response = client.post("/api/v1/face/verify", files=files)
        
    assert response.status_code == 400
    assert "No face detected" in response.json()["detail"]
