from pydantic import BaseModel


class InteractionCreate(BaseModel):
    hcp_id: int
    interaction_type: str
    notes: str


class InteractionResponse(BaseModel):
    id: int
    hcp_id: int
    interaction_type: str
    notes: str
    summary: str | None = None
    sentiment: str | None = None
    follow_up: str | None = None
    entities: list[str] | None = None

    class Config:
        from_attributes = True