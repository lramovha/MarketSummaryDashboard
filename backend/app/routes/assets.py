# from fastapi import APIRouter, HTTPException
# from typing import List
# from app.models.asset import Asset
# from app.crud.asset_crud import get_all_assets, get_asset_by_symbol

# router = APIRouter()

# @router.get("/", response_model=List[Asset])
# async def read_assets():
#     assets = get_all_assets()
#     if assets is None:
#         raise HTTPException(status_code=404, detail="Assets not found")

#     # Log the assets being returned to the frontend
#     print(f"Returning assets: {assets}")
#     return assets

# backend/app/routes/assets.py
from fastapi import APIRouter, HTTPException
from typing import List
from app.models.asset import Asset
from app.utils.yahoo_finance import fetch_assets_data  # Correct import path
from app.crud.asset_crud import get_all_assets, get_asset_by_symbol

router = APIRouter()

@router.get("/", response_model=List[Asset])
async def read_assets():
    # List of symbols to fetch
    symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NFLX", "META", "NVDA", "INTC", "SPY"]
    assets = fetch_assets_data(symbols)  # Fetch data for all assets
    if not assets:
        raise HTTPException(status_code=404, detail="Assets not found")
    return assets



@router.get("/{symbol}", response_model=Asset)
async def read_asset(symbol: str):
    asset = get_asset_by_symbol(symbol)
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    # Log the asset being returned
    print(f"Returning asset for {symbol}: {asset}")
    return asset


