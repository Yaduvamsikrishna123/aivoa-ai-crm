from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Text,
    JSON
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(150), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())


class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    specialization = Column(String(100))

    hospital = Column(String(150))

    city = Column(String(100))

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    interactions = relationship(
        "Interaction",
        back_populates="hcp"
    )


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_id = Column(
        Integer,
        ForeignKey("hcps.id")
    )

    interaction_type = Column(String(50))

    notes = Column(Text)

    summary = Column(Text)

    sentiment = Column(String(50)) 

    follow_up = Column(Text)

    entities = Column(JSON)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    hcp = relationship(
        "HCP",
        back_populates="interactions"
    )    