import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  //local states
  const [cryptoIds, setCryptoIds] = useState([]);
  const [selectedCryptoIds, setSelectedCryptoIds] = useState([]);

  const userId="66010bd5c82404eac4ca300f"

  const navigate = useNavigate();

  useEffect(() => {
    getCryptoIds();
  }, []);

  const getCryptoIds = async () => {
    console.log("getCryptoIds,,,,,,,,,,,");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/crypto/unique-ids"
      );
      setCryptoIds(response.data.data || []);
      console.log("cryptoIds......", response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getUserFavlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/favorites/${userId}`
      );
      setSelectedCryptoIds(response.data.data || []);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  //this function handels the checkbox changes
  const handleCheckboxChange = (id) => {
    // Check if the id is already selected
    if (selectedCryptoIds.includes(id)) {
      // If it is, remove it from the array
      setSelectedCryptoIds(
        selectedCryptoIds.filter((cryptoId) => cryptoId !== id)
      );
    } else {
      // Otherwise, add it to the array
      setSelectedCryptoIds([...selectedCryptoIds, id]);
    }
  };

  //this function handels the submit button
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/api/user/favorites", {
        userId: "",
        cryptoIds: selectedCryptoIds,
      });
      alert("Favorites saved successfully!");
    } catch (error) {
      console.log("Error", error);
      alert("Failed to execute the Save function");
    }
  };
  //const location = useLocation();
  return (
    <div className="homepage">
      <h1>Hello and Welcome to Crypto Mart</h1>
      <div className="crypto_Id_List">
        <h2>Select Your Favorite Cryptocurrencies</h2>
        {cryptoIds.map((id) => (
          <div key={id}>
            <input
              type="checkbox"
              value={id}
              onChange={() => handleCheckboxChange(id)}
              checked={selectedCryptoIds.includes(id)} // Mark checkbox as checked if id is in selectedCryptoIds
            />{" "}
            {id}
          </div>
        ))}
        <button onClick={handleSubmit}>Save Favorites</button>
      </div>
    </div>
  );
}
export default Home;
