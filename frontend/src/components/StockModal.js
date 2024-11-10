import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import '../styles/StockModal.css';

const StockModal = ({ asset, onClose }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!asset) return;
  
    const fetchChartData = async () => {
      setLoading(true);
      setError(false);  // Reset error state
  
      try {
        const symbol = asset.symbol;
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`;
  
        const response = await axios.get(url);
  
        console.log("Full API response:", response.data); // Log the full response to the console for debugging
  
        // Ensure we have the necessary data
        const chartResult = response.data.chart.result[0];
        if (!chartResult) {
          throw new Error("No chart data available for the symbol");
        }
  
        const prices = chartResult.indicators.quote[0].close;
        const timestamps = chartResult.timestamp;
  
        if (!prices || !timestamps) {
          throw new Error("Missing price or timestamp data");
        }
  
        // Format data for the chart
        const labels = timestamps.map((timestamp) => {
          const date = new Date(timestamp * 1000);
          return `${date.getDate()}/${date.getMonth() + 1}`;
        });
  
        const data = {
          labels: labels,
          datasets: [
            {
              label: `${asset.symbol} Price History`,
              data: prices,
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        };
  
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError(true); // Set error state
      } finally {
        setLoading(false);
      }
    };
  
    fetchChartData();
  }, [asset]);
  
  


  if (!asset) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>{asset.name} ({asset.symbol})</h3>
        <p>Price: ${asset.price.toFixed(2)}</p>
        <p>Change: {asset.change.toFixed(2)}%</p>

        {loading ? (
          <p>Loading chart data...</p>
        ) : error ? (
          <p>Failed to load chart data.</p>
        ) : chartData ? (
          <div className="chart-container">
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        ) : (
          <p>No chart data available.</p>
        )}
      </div>
    </div>
  );
};

export default StockModal;




