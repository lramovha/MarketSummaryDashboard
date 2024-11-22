// src/components/MarketSummary.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import StockCard from "./StockCard";
import StockModal from "./StockModal";
import LoadingSpinner from "./LoadingSpinner"; // Import the spinner
import '../styles/MarketSummary.css';

const MarketSummary = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null); // New state for selected asset
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/assets");
        // Sort assets by price in ascending order before setting the state
        const sortedAssets = response.data.sort((a, b) => a.price - b.price);
        setAssets(sortedAssets);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    
    fetchAssets();
  }, []);

  const handleCardClick = async (asset) => {
    setSelectedAsset(asset); // Set the selected asset when a card is clicked
    try {
      const response = await axios.get(`http://localhost:8000/api/assets/${asset.symbol}`);
      setSelectedAsset(response.data); // Set the selected asset with fetched data
    } catch (error) {
      console.error(`Error fetching data for ${asset.symbol}:`, error.message);
    }
  };
  

  const closeModal = () => {
    setSelectedAsset(null); // Close the modal
  };

  return (
    <div className="market-summary">
      <h2>Market Summary</h2>
      <div className="card-container">
        {loading ? ( // Show spinner if loading
          <LoadingSpinner />
        ) : (
          assets.length > 0 ? (
            assets.map((asset) => (
              <StockCard key={asset.symbol} asset={asset} onClick={() => handleCardClick(asset)} />
            ))
          ) : (
            <p>No assets available</p>
          )
        )}
      </div>
      {selectedAsset && <StockModal asset={selectedAsset} onClose={closeModal} />}
    </div>
  );
};

export default MarketSummary;


