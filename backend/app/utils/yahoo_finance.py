# # backend/app/services/yahoo_finance.py
# import yfinance as yf
# from typing import List
# from app.models.asset import Asset, ChartData

# def fetch_asset_data(symbol: str) -> Asset:
#     try:
#         stock = yf.Ticker(symbol)
#         stock_info = stock.info

#         # Log the fetched stock info
#         print(f"Fetched stock info for {symbol}: {stock_info}")

#         price = stock_info.get("regularMarketPrice", 0.0)
#         change = stock_info.get("regularMarketChangePercent", 0.0)

#         price = float(price) if isinstance(price, (int, float)) else 0.0
#         change = float(change) if isinstance(change, (int, float)) else 0.0

#         return Asset(
#             symbol=symbol,
#             name=stock_info.get("longName", "N/A"),
#             price=price,
#             change=change
#         )
#     except Exception as e:
#         print(f"Error fetching asset data for {symbol}: {e}")
#         return Asset(symbol=symbol, name="N/A", price=0.0, change=0.0)

# backend/app/services/yahoo_finance.py
import yfinance as yf
from typing import List
from app.models.asset import Asset, ChartData

def get_stock_info(symbol):
    try:
        ticker = yf.Ticker(symbol)
        stock_info = ticker.info
        print(f"Full stock info for {symbol}: {stock_info}")  # Print full info for debugging
        return stock_info
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")
        return {}

def fetch_asset_data(symbol):
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

    # Log the values to verify correctness
    print(f"{symbol} - regularMarketPrice/currentPrice: {price}, previousClose: {previous_close}")

    # Calculate change percentage if both fields are available
    if previous_close and price:
        change = ((price - previous_close) / previous_close) * 100
    else:
        change = 0.0

    # Log calculated change
    print(f"Calculated change for {symbol}: {change}%")

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
