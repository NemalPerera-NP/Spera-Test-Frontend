import React, { useEffect, useState } from "react";
import axios from "axios";

function CryptoPriceTable() {
  const [cryptoPrices, setCryptoPrices] = useState([]);

  const userId = localStorage.getItem("UserId");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

 

  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/crypto/latest-prices",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("console.log(response.data)", response.data.data);
      setCryptoPrices(response.data); // Assuming your API returns an array of objects with cryptoId and price
    } catch (error) {
      console.error("Failed to fetch crypto prices:", error);
    }
  };

  return (
    <div>
      <h2>Cryptocurrency Prices</h2>
      {cryptoPrices.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Cryptocurrency</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cryptoPrices.map((crypto) => (
              <tr key={crypto.cryptoId}>
                <td>{crypto.cryptoId}</td>
                <td>${crypto.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CryptoPriceTable;