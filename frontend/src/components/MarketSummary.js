// // src/components/MarketSummary.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StockCard from "./StockCard";

// const MarketSummary = () => {
//   const [assets, setAssets] = useState([]);

//   useEffect(() => {
//     const fetchAssets = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/assets");
//         setAssets(response.data);
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };
    
//     fetchAssets();
//   }, []);

//   return (
//     <div className="market-summary">
//       <h2>Market Summary</h2>
//       <div className="card-container">
//         {assets.length > 0 ? (
//           assets.map((asset) => (
//             <StockCard key={asset.symbol} asset={asset} />
//           ))
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MarketSummary;

import React, { useEffect, useState } from "react";
import axios from "axios";
import StockCard from "./StockCard";

const MarketSummary = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/assets");
        setAssets(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };
    
    fetchAssets(); // Call the API when the component mounts
  }, []);

  return (
    <div className="market-summary">
      <h2>Market Summary</h2>
      <div className="card-container">
        {assets.length > 0 ? (
          assets.map((asset) => (
            <StockCard key={asset.symbol} asset={asset} />
          ))
        ) : (
          <p>Loading...</p> // Display loading message while data is being fetched
        )}
      </div>
    </div>
  );
};

export default MarketSummary;



