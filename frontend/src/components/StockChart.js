import React from "react";
import { Line } from "react-chartjs-2";

const StockChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Price (USD)" } },
    },
  };

  return <Line data={data} options={options} />;
};

export default StockChart;


