import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../styles/StockModal.css";

const StockModal = ({ asset, onClose }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!asset) return; // If asset is null or undefined, don't proceed

    let isMounted = true; // Flag to track if the component is still mounted

    const fetchChartData = async () => {
      setLoading(true);
      setError(false); // Reset error before fetching new data

      try {
        const symbol = asset.symbol;
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`;

        const response = await axios.get(url);
        if (!isMounted) return; // If the component is unmounted, stop updating state

        const chartResult = response.data.chart.result[0];
        if (!chartResult) throw new Error("No chart data available for this symbol.");

        const prices = chartResult.indicators.quote[0]?.close;
        const timestamps = chartResult.timestamp;

        if (!prices || !timestamps) throw new Error("Invalid chart data received.");

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
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        };

        setChartData(data);
      } catch (err) {
        if (isMounted) setError(true);
        console.error("Error fetching chart data:", err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchChartData();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [asset]);

  if (!asset) return null; // If there's no asset, return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3>
          {asset.name} ({asset.symbol})
        </h3>
        <p>Price: ${asset.price.toFixed(2)}</p>
        <p>Change: {asset.change.toFixed(2)}%</p>

        {/* Show loading message while fetching data */}
        {loading && <p>Loading chart data...</p>}

        {/* Show error message if something went wrong */}
        {error && <p>Error loading chart data. Please try again later.</p>}

        {/* Display chart if data is available */}
        {chartData && !loading && !error && (
          <div className="chart-container">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true },
                },
                scales: {
                  x: { title: { display: true, text: "Date" } },
                  y: { title: { display: true, text: "Price (USD)" } },
                },
              }}
            />
          </div>
        )}

        {/* Show a message if no chart data is available */}
        {!chartData && !loading && !error && <p>No chart data available for this stock.</p>}
      </div>
    </div>
  );
};

export default StockModal;

