from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
import os

from app.database.database import get_db
from app.database.models import User

security = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        email = payload.get("sub")

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token",
        )

    user = db.query(User).filter(User.email == email).first()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    return user