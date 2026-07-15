from sqlalchemy.orm import Session

from app.database.models import User
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


def register_user(db: Session, name: str, email: str, password: str):
    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        return None

    new_user = User(
        name=name,
        email=email,
        password=hash_password(password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(db: Session, email: str, password: str):
    print("=" * 50)
    print("Email:", email)
    print("Password:", password)

    user = db.query(User).filter(User.email == email).first()

    print("User:", user)

    if not user:
        print("❌ User not found")
        return None

    print("Stored hash:", user.password)

    result = verify_password(password, user.password)

    print("Password Match:", result)

    if not result:
        print("❌ Password mismatch")
        return None

    print("✅ Login Successful")

    token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }