// frontend/src/components/StockCard.js
import React from 'react';
import '../styles/StockCard.css';

function StockCard({ asset, onClick }) {
  const { symbol, name, price, change } = asset;

  const priceColor = change >= 0 ? 'green' : 'red';
  const formattedChange = change !== undefined ? change.toFixed(2) : "0.00";

  return (
    <div className="stock-card" onClick={onClick}>
      <h3>{name} ({symbol})</h3>
      <p className="price" style={{ color: priceColor }}>
        Price: ${price.toFixed(2)}
      </p>
      <p className={`change ${priceColor}`}>
        Change: {formattedChange}%
      </p>
    </div>
  );
}

export default StockCard;
