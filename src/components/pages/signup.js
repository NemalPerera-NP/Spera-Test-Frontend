// In Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/signup.css";

const Login_url = "http://localhost:8080/api/auth/signup";

function Signup() {
  const navigate = useNavigate();

  //local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [signupError, setSignuprror] = useState("");

  const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;



  // Function to handle form submission
  async function submitSignup(e) {
    e.preventDefault();

    try {
      if (emailVal.test(email)) {
        console.log("Email valid");
        if (password.length > 6) {
          console.log("Password is within range");
          if (password !== confirmpassword) {
            setSignuprror("Passwords do not match");
            console.log("Passwords do not match");
          } else {
            console.log("form validated");

            const response = await axios.post(Login_url, {
              firstname,
              lastname, 
              email, 
              username, 
              password
              
            });
            if (response.status === 201) {
              // success
              console.log("Signup successful", response.data);
              clear();
              navigate("/");
            }
          }
        } else {
          console.log("Pasword Should be more than 6 characters");
          setSignuprror("Pasword Should be more than 6 characters");
        }
      } else {
        setSignuprror("Enter a Valid Email address");
        console.log("Email not valid");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 401) {
          setSignuprror(error.response.data.message);
        } else {
          setSignuprror("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        //no response received
        console.log(error.request);
      } else {
        // Something happened in the request
        console.log("Error", error.message);
      }
      console.log(error);
    }
  }

  function clear() {
    //clear all local states
    setUsername("");
    setPassword("");
    setConfirmpassword("");
    setEmail("");
    setLastname("");
    setFirstname("");
    setSignuprror("");
  }

  return (
    <div className="Login_Container">
      <h1>Signup Page</h1>

      <form onSubmit={submitSignup}>
        <input
          type="text"
          id="firstname"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          // className={styles.input}
        />
        <input
          type="text"
          id="lastname"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          // className={styles.input}
        />
        <input
          type="text"
          id="username"
          placeholder="UserName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          // className={styles.input}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          // className={styles.input}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          // className={styles.input}
        />
        <input
          type="password"
          id="confirmpassword"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          required
          // className={styles.input}
        />

        {signupError && <div className={styles.error_msg}>{signupError}</div>}
        <button type="submit" className={styles.green_btn}>
          Sing Up
        </button>
        {/* //<input type="submit" onClick={submit} /> */}
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/login">Login Page</Link>
    </div>
  );
}
export default Signup;
