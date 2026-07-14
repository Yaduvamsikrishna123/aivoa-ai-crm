from pydantic import BaseModel

class AIResponse(BaseModel):
    summary: str
    sentiment: str
    follow_up: str
    entities: list[str]