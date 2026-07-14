from fastapi import APIRouter

from app.ai.graph import graph

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post("/process")
def process_interaction(payload: dict):

    result = graph.invoke(
        {
            "notes": payload["notes"]
        }
    )

    return result