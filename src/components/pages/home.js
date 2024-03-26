import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoPriceChart from "../charts/CryptoPriceChart";
import styles from "../styles/home.module.css";

function Home() {
  //local states
  const [cryptoIds, setCryptoIds] = useState([]);
  const [selectedCryptoIds, setSelectedCryptoIds] = useState([]);
  const [tittle, setTittle] = useState("Create");

  const navigate = useNavigate();
  const userId = localStorage.getItem("UserId");

  const token = localStorage.getItem("token");

  useEffect(() => {
    getCryptoIds();
    getUserFavlist();
    //console.log("selectedCryptoIds>>>>>>>>>>>", selectedCryptoIds);
  }, []);

  //this function call call for API to get all the Cryptocurencies in the database
  const getCryptoIds = async () => {
    console.log("getCryptoIds,,,,,,,,,,,");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/crypto/unique-ids",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCryptoIds(response.data.data || []);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //fetch data about user favorite crypto
  const getUserFavlist = async () => {
    console.log("function getUserFavlist called....", userId);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/favorites/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedCryptoIds(response.data.data || []);
      //console.log("setSelectedCryptoIds", response.data.data);
      setTittle("Update");
      // setnewSelectionCrypt(selectedCryptoIds.slice())
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    console.log("checkbox selected", id);
    setSelectedCryptoIds((currentSelectedIds) => {
      if (currentSelectedIds.includes(id)) {
        const updatedSelectedIds = currentSelectedIds.filter(
          (cryptoId) => cryptoId !== id
        );
        console.log("selectedCryptoIds after removal:", updatedSelectedIds);
        return updatedSelectedIds;
      } else {
        const updatedSelectedIds = [...currentSelectedIds, id];
        console.log("selectedCryptoIds after addition:", updatedSelectedIds);
        return updatedSelectedIds;
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/user/all-in-one/favorites",
        { userId, cryptoIds: selectedCryptoIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Favorites saved successfully!");
      getUserFavlist();
    } catch (error) {
      console.log("Error", error);
      alert("Failed to execute the Save function");
    }
  };
  //const location = useLocation();
  return (
    <div className={styles.homepage_container}>
      <div className={styles.left_side_bottom} >
        <div lassName={styles.left_side_top}>
          <CryptoPriceChart />
        </div>
      </div>
      <div className={styles.right_side_container}>
        <div className={styles.left_side_container}>
          <div className="crypto_Id_List">
            <h2>Select Your Favorite <br/>Cryptocurrencies...</h2>
            {cryptoIds.map((id) => (
              <div key={id}>
                <input
                  type="checkbox"
                  value={id}
                  onChange={() => handleCheckboxChange(id)}
                  checked={selectedCryptoIds.includes(id)} 
                />{" "}
                {id}
              </div>
            ))}
            <button onClick={handleSubmit} className={styles.white_btn}>{tittle} Favorites List</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
