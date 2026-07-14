from sqlalchemy.orm import Session

from app.database.models import HCP


def create_hcp(db: Session, hcp_data):
    hcp = HCP(
        name=hcp_data.name,
        specialization=hcp_data.specialization,
        hospital=hcp_data.hospital,
        city=hcp_data.city,
    )

    db.add(hcp)
    db.commit()
    db.refresh(hcp)

    return hcp


def get_all_hcps(db: Session):
    return db.query(HCP).all()


def get_hcp(db: Session, hcp_id: int):
    return db.query(HCP).filter(HCP.id == hcp_id).first()