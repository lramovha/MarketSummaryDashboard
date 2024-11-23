# backend/app/services/yahoo_finance.py
import yfinance as yf
from typing import List
from app.models.asset import Asset, ChartData
from fastapi import APIRouter, HTTPException
import pandas as pd

def get_stock_info(symbol: str):
    try:
        ticker = yf.Ticker(symbol)
        stock_info = ticker.info
        print(f"Full stock info for {symbol}: {stock_info}")  # Print full info for debugging
        return stock_info
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")
        return None

def fetch_asset_data(symbol: str):
    stock_info = get_stock_info(symbol)
    if not stock_info:
        return {
            "symbol": symbol,
            "name": "N/A",
            "price": 0.0,
            "change": 0.0
        }

    # Extract price and previous close values
    price = stock_info.get('regularMarketPrice') or stock_info.get('currentPrice') or stock_info.get('previousClose', 0.0)
    previous_close = stock_info.get('previousClose')

    # Calculate change percentage if both fields are available
    change = 0.0
    if previous_close and price:
        change = ((price - previous_close) / previous_close) * 100

    return {
        "symbol": symbol,
        "name": stock_info.get("longName", "N/A"),
        "price": price,
        "change": change
    }

# Function to fetch data for multiple assets
def fetch_assets_data(symbols: List[str]) -> List[Asset]:
    assets = []
    for symbol in symbols:
        assets.append(fetch_asset_data(symbol))
    return assets

def fetch_chart_data(symbol: str, period="1d", interval="5m") -> List[ChartData]:
    try:
        stock = yf.Ticker(symbol)
        hist = stock.history(period=period, interval=interval)

        # Print the historical data for debugging
        print(f"Historical data for {symbol}: {hist}")

        # Format data for the chart, converting the index to a readable timestamp
        return [
            ChartData(
                time=row.name.strftime('%Y-%m-%d %H:%M:%S'),  # Formatting the timestamp to string
                open=row["Open"],
                high=row["High"],
                low=row["Low"],
                close=row["Close"],
                volume=row["Volume"]
            )
            for row in hist.itertuples()
        ]
    
    except Exception as e:
        print(f"Error fetching chart data for {symbol}: {e}")
        return []
    print(f"Historical data for {symbol}: {hist}")
    
    print(f"Chart data for {symbol}: {chart_data}")


# FastAPI endpoint to fetch chart data
router = APIRouter()

@router.get("/chart_data/{symbol}")
async def get_chart_data(symbol: str, period: str = "1d", interval: str = "5m"):
    chart_data = fetch_chart_data(symbol, period, interval)
    if not chart_data:
        raise HTTPException(status_code=404, detail=f"Chart data not found for symbol: {symbol}")
    return {"chartData": chart_data}
