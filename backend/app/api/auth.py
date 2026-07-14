from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.auth import UserRegister
from app.services.auth_service import register_user

from app.schemas.auth import UserLogin
from app.services.auth_service import login_user
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    new_user = register_user(
        db,
        user.name,
        user.email,
        user.password
    )

    if new_user is None:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return {
        "message": "User registered successfully"
    }

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    token = login_user(
        db,
        user.email,
        user.password
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return token

@router.get("/me")
def get_me(current_user=Depends(get_current_user)):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
    }    