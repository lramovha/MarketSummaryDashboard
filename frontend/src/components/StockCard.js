// // frontend/src/components/StockCard.js
// import React from "react";
// import "../styles/StockCard.css"; // Ensure the styles are linked

// const StockCard = ({ asset }) => {
//   const priceClass = asset.change > 0 ? "price positive" : asset.change < 0 ? "price negative" : "price";
//   const changeClass = asset.change > 0 ? "change positive" : asset.change < 0 ? "change negative" : "change";

//   return (
//     <div className="stock-card">
//       <div className="stock-header">
//         <h3 className="stock-name">{asset.name} ({asset.symbol})</h3>
//       </div>
//       <div className="stock-price">
//         <p className={priceClass}>Price: ${asset.price.toFixed(2)}</p>
//       </div>
//       <div className="stock-change">
//         <p className={changeClass}>Change: {asset.change.toFixed(2)}%</p>
//       </div>
//     </div>
//   );
// };

// export default StockCard;

// frontend/src/components/StockCard.js
import React from 'react';
import '../styles/StockCard.css';

function StockCard({ asset }) {
  const { symbol, name, price, change } = asset;

  // Set the color based on change value
  const priceColor = change >= 0 ? 'green' : 'red';  // Green for positive, red for negative
  const formattedChange = change !== undefined ? change.toFixed(2) : "0.00";  // Format change to two decimal places

  return (
    <div className="stock-card">
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










