# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import assets
from app.utils.yahoo_finance import router as finance_router

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assets.router, prefix="/api/assets", tags=["Assets"])
# Include the finance router
app.include_router(finance_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the Stock Market Dashboard API"}
