from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    project_name: str = "Aether Platform - AI Service"
    api_v1_prefix: str = "/api/v1"
    
    # Face Verification Settings
    face_match_threshold: float = 0.75
    
    # Model configuration for pydantic
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)


settings = Settings()
