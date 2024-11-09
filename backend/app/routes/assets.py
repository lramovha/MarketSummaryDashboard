from fastapi import APIRouter, HTTPException
from typing import List
from app.models.asset import Asset
from app.crud.asset_crud import get_all_assets, get_asset_by_symbol

router = APIRouter()

@router.get("/", response_model=List[Asset])
async def read_assets():
    assets = get_all_assets()
    if assets is None:
        raise HTTPException(status_code=404, detail="Assets not found")

    # Log the assets being returned to the frontend
    print(f"Returning assets: {assets}")
    return assets

@router.get("/{symbol}", response_model=Asset)
async def read_asset(symbol: str):
    asset = get_asset_by_symbol(symbol)
    if asset is None:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    # Log the asset being returned
    print(f"Returning asset for {symbol}: {asset}")
    return asset

