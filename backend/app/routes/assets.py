# backend/app/routes/assets.py
from fastapi import APIRouter, HTTPException
from typing import List
from app.models.asset import Asset
from app.utils.yahoo_finance import fetch_assets_data  # Correct import path
from app.utils.yahoo_finance import fetch_asset_data

router = APIRouter()

@router.get("/", response_model=List[Asset])
async def read_assets():
    # List of symbols to fetch
    symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NFLX", "META", "NVDA", "INTC", "SPY", "V", "WMT", "GS", "JPM", "DIS", "CVX"]
    assets = fetch_assets_data(symbols)  # Fetch data for all assets
    if not assets:
        raise HTTPException(status_code=404, detail="Assets not found")
    return assets



@router.get("/{symbol}", response_model=Asset)
async def read_asset(symbol: str):
    asset = fetch_asset_data(symbol)  # Fetch real-time data here
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    # Log the asset being returned
    print(f"Returning asset for {symbol}: {asset}")
    return asset


