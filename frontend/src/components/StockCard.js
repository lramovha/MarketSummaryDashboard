// frontend/src/components/StockCard.js
import React from "react";
import "../styles/StockCard.css"; // Ensure the styles are linked

const StockCard = ({ asset }) => {
  const priceClass = asset.change > 0 ? "price positive" : asset.change < 0 ? "price negative" : "price";
  const changeClass = asset.change > 0 ? "change positive" : asset.change < 0 ? "change negative" : "change";

  return (
    <div className="stock-card">
      <div className="stock-header">
        <h3 className="stock-name">{asset.name} ({asset.symbol})</h3>
      </div>
      <div className="stock-price">
        <p className={priceClass}>Price: ${asset.price.toFixed(2)}</p>
      </div>
      <div className="stock-change">
        <p className={changeClass}>Change: {asset.change.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default StockCard;







