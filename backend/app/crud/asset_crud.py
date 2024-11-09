# backend/app/crud/asset_crud.py
import yfinance as yf
from app.models.asset import Asset, ChartData

# Fetch all assets (you can replace this with a database query if needed)
def get_all_assets():
    # Example static assets
    return [
        Asset(symbol="AAPL", name="Apple Inc.", price=150.0, change=1.5),
        Asset(symbol="GOOGL", name="Alphabet Inc.", price=2800.0, change=-2.0),
    ]

# Fetch a specific asset by symbol
def get_asset_by_symbol(symbol: str):
    assets = get_all_assets()
    for asset in assets:
        if asset.symbol == symbol:
            return asset
    return None

# Fetch chart data for a symbol from Yahoo Finance
def get_chart_data(symbol: str, period: str = "1d", interval: str = "5m"):
    # Use yfinance to fetch the historical data for the stock symbol
    try:
        stock = yf.Ticker(symbol)
        # Yahoo Finance uses different arguments for time periods (e.g., "1d", "5d", "1mo", "1y")
        data = stock.history(period=period, interval=interval)
        
        chart_data = []
        # Convert the stock data to the ChartData model
        for index, row in data.iterrows():
            chart_data.append(ChartData(
                time=index.strftime("%Y-%m-%d %H:%M:%S"),  # Convert timestamp to string
                open=row['Open'],
                high=row['High'],
                low=row['Low'],
                close=row['Close'],
                volume=int(row['Volume'])
            ))
        return chart_data
    except Exception as e:
        print(f"Error fetching chart data: {e}")
        return None
