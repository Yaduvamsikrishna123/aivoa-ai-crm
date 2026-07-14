from sqlalchemy.orm import Session

from app.database.models import Interaction
from app.ai.graph import graph


def create_interaction(db: Session, interaction_data):
    ai_result = graph.invoke(
        {
            "notes": interaction_data.notes
        }
    )

    interaction = Interaction(
        hcp_id=interaction_data.hcp_id,
        interaction_type=interaction_data.interaction_type,
        notes=interaction_data.notes,
        summary=ai_result["summary"],
        sentiment=ai_result["sentiment"],
        follow_up=ai_result["follow_up"],
        entities=ai_result["entities"],
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return interaction


def get_all_interactions(db: Session):
    return db.query(Interaction).all()


def get_interaction(db: Session, interaction_id: int):
    return (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )