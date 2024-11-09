// frontend/src/components/StockList.js
import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';

function StockList() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch('/api/assets')
      .then(response => response.json())
      .then(data => {
        // Check the data to ensure it's properly received
        console.log("Fetched assets:", data);
        setAssets(data);  // Make sure this line runs with correct data
      })
      .catch(error => console.error('Error fetching assets:', error));
  }, []);

  return (
    <div className="stock-list">
      {assets.map((asset) => (
        <StockCard key={asset.symbol} asset={asset} />
      ))}
    </div>
  );
}

export default StockList;
