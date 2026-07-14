from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.hcp import HCPCreate, HCPResponse
from app.services.hcp_service import (
    create_hcp,
    get_all_hcps,
    get_hcp,
)

router = APIRouter(
    prefix="/hcps",
    tags=["HCP"],
)


@router.post("/", response_model=HCPResponse)
def create(hcp: HCPCreate, db: Session = Depends(get_db)):
    return create_hcp(db, hcp)


@router.get("/", response_model=list[HCPResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_hcps(db)


@router.get("/{hcp_id}", response_model=HCPResponse)
def get_one(hcp_id: int, db: Session = Depends(get_db)):
    hcp = get_hcp(db, hcp_id)

    if not hcp:
        raise HTTPException(
            status_code=404,
            detail="HCP not found",
        )

    return hcp