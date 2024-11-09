// frontend/src/components/StockTable.js
import React, { useEffect, useState } from 'react';
import { getAssets } from '../api/stockApi';
import StockCard from './StockCard';
import './StockTable.css';

const StockTable = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const assetsData = await getAssets();
      setAssets(assetsData);
    };
    fetchAssets();
  }, []);

  return (
    <div className="stock-table">
      <h2>Market Summary</h2>
      <div className="stock-cards">
        {assets.map((asset) => (
          <StockCard key={asset.symbol} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default StockTable;



