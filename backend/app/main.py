from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.database.database import engine, Base
from app.database import models
from app.api.auth import router as auth_router
from app.api.hcp import router as hcp_router
from app.api.interaction import router as interaction_router
from app.api.ai import router as ai_router

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AIVOA CRM Backend",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(hcp_router)
app.include_router(interaction_router)
app.include_router(ai_router)


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