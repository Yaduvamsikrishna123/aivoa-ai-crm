from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse,
)
from app.services.interaction_service import (
    create_interaction,
    get_all_interactions,
    get_interaction,
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"],
)


@router.post("/", response_model=InteractionResponse)
def create(
    interaction: InteractionCreate,
    db: Session = Depends(get_db),
):
    return create_interaction(db, interaction)


@router.get("/", response_model=list[InteractionResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_interactions(db)


@router.get("/{interaction_id}", response_model=InteractionResponse)
def get_one(
    interaction_id: int,
    db: Session = Depends(get_db),
):
    interaction = get_interaction(db, interaction_id)

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return interaction