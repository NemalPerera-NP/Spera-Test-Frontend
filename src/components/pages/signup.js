// In Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/signup.css";

const Login_url = "http://localhost:8080/api/auth/signup";

function Signup() {
  //local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [signupError, setSignuprror] = useState("");

  //email validation regex
  //const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  function formValidation() {
    if (!emailVal.test(email)) {
      setSignuprror("Enter a Valid Email address");
      console.log("");
      //return;
    }
    if (password.length >= 5) {
      console.log("Pasword Should be more than 6 characters");
      setSignuprror("Pasword Should be more than 6 characters");
      //return;
    }
    if (password !== confirmpassword) {
      setSignuprror("Passwords do not match");
      console.log("Passwords do not match");
      //return;
    }

    console.log("form validated");
  }

  // Function to handle form submission
  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post(Login_url, {
        username,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Login_Container">
      <h1>Signup Page</h1>

      <form>
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
        <button
          type="submit"
          className={styles.green_btn}
        >
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
