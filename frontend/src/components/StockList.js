// frontend/src/components/StockList.js
import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';

const StockList = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch('/api/assets/test')  // Using test endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data from backend:", data);  // Debug log
        setAssets(data);
      })
      .catch((error) => console.error('Error fetching assets:', error));
  }, []);

  return (
    <div className="stock-list">
      {assets.map((asset) => (
        <StockCard key={asset.symbol} asset={asset} />
      ))}
    </div>
  );
};

export default StockList;
