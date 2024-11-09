# backend/app/models/asset.py
from pydantic import BaseModel

class Asset(BaseModel):
    symbol: str
    name: str
    price: float
    change: float

class ChartData(BaseModel):
    time: str
    open: float
    high: float
    low: float
    close: float
    volume: int
