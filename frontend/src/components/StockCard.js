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

  // Determine the change class based on positive or negative value
  const changeClass = change >= 0 ? 'positive' : 'negative';
  const formattedChange = change !== undefined ? change.toFixed(2) : "0.00";  // Format change to two decimal places

  return (
    <div className="stock-card">
      <h3 className="stock-name">{name} ({symbol})</h3>
      <p className={`price ${changeClass}`}>
        Price: ${price.toFixed(2)}
      </p>
      <p className={`change ${changeClass}`}>
        Change: {formattedChange}%
      </p>
    </div>
  );
}

export default StockCard;










