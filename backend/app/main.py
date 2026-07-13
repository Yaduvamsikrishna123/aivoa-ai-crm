from fastapi import FastAPI
from sqlalchemy import text

from app.database.database import engine, Base
from app.database import models
from app.api.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AIVOA CRM Backend",
    version="1.0.0"
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "AIVOA CRM Backend is running!"
    }


@app.get("/db-test")
def db_test():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return {
            "status": "Database Connected",
            "result": result.scalar()
        }