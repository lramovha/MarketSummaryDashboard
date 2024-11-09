# backend/app/services/yahoo_finance.py
import yfinance as yf
from typing import List
from app.models.asset import Asset, ChartData

def fetch_asset_data(symbol: str) -> Asset:
    try:
        stock = yf.Ticker(symbol)
        stock_info = stock.info

        # Log the fetched stock info
        print(f"Fetched stock info for {symbol}: {stock_info}")

        price = stock_info.get("regularMarketPrice", 0.0)
        change = stock_info.get("regularMarketChangePercent", 0.0)

        price = float(price) if isinstance(price, (int, float)) else 0.0
        change = float(change) if isinstance(change, (int, float)) else 0.0

        return Asset(
            symbol=symbol,
            name=stock_info.get("longName", "N/A"),
            price=price,
            change=change
        )
    except Exception as e:
        print(f"Error fetching asset data for {symbol}: {e}")
        return Asset(symbol=symbol, name="N/A", price=0.0, change=0.0)

def fetch_chart_data(symbol: str, period="1d", interval="5m") -> List[ChartData]:
    try:
        stock = yf.Ticker(symbol)
        hist = stock.history(period=period, interval=interval)

        print(f"Fetched chart data for {symbol}: {hist}")  # Log the chart data

        return [
            ChartData(
                time=str(row.name),
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
