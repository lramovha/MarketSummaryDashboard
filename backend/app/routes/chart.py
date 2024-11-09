# backend/app/routes/chart.py
from fastapi import APIRouter, HTTPException
from app.crud.asset_crud import get_chart_data
from app.models.asset import ChartData
from typing import List

router = APIRouter()

# Endpoint to fetch chart data for a specific asset symbol
@router.get("/{symbol}", response_model=List[ChartData])
async def read_chart(symbol: str, period: str = "1d", interval: str = "5m"):
    chart_data = get_chart_data(symbol, period, interval)
    if not chart_data:
        raise HTTPException(status_code=404, detail="Chart data not found")
    return chart_data
