from pydantic import BaseModel


class HCPCreate(BaseModel):
    name: str
    specialization: str
    hospital: str
    city: str


class HCPResponse(BaseModel):
    id: int
    name: str
    specialization: str
    hospital: str
    city: str

    class Config:
        from_attributes = True