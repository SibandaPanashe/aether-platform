from enum import Enum
from pydantic import BaseModel, Field


class ConfidenceLevel(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"
    NONE = "NONE"


class FaceVerificationResponse(BaseModel):
    """
    Response model for the face verification endpoint.
    """
    match: bool = Field(
        ..., 
        description="True if the similarity score is greater than or equal to the threshold."
    )
    score: float = Field(
        ..., 
        description="Cosine similarity score between the two faces (0.0 to 1.0)."
    )
    threshold: float = Field(
        ..., 
        description="The similarity threshold used to determine a match."
    )
    confidence: ConfidenceLevel = Field(
        ..., 
        description="Qualitative confidence level of the match."
    )
