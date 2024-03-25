// In Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login_url = "http://localhost:8080/api/auth/login";

function Login() {
  const navigate = useNavigate();
  //local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Function to handle form submission
  async function submit(e) {
    e.preventDefault();
    console.log("login");

    try {
      console.log("login working");

      const response = await axios.post(Login_url, { username, password });

      // Assuming Axios does not throw for non-2xx responses
      if (response.status === 401) {
        // unauthorized
        console.log("Unauthorized:", response.data.message);
        clear();
        alert(response.data.message);
      } else if (response.status === 200) {
        // success
        console.log("Login successful", response.data);
        clear();
        navigate("/home");
      } else {
        // other statuses
        console.log("Other status:", response.data.message);
        clear();
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // that falls out of the range of 2xx
        console.log("error.response.data......", error.response.data);
        console.log("error.response.status.......", error.response.status);
        console.log("error.response.headers.......", error.response.headers);

        // Handling based on status
        if (error.response.status === 401) {
          // unauthorized error
          alert(`Login failed: ${error.response.data.message}`);
          clear();
        } else {
          // other errors
          alert("An error occurred. Please try again later.");
          clear();
        }
      } else if (error.request) {
        //no response received
        console.log(error.request);
      } else {
        // Something happened in the request
        console.log("Error", error.message);
      }
    }
  }

  //function to clear input fields
  function clear() {
    console.log("clear function called");
    setUsername("");
    setPassword("");
  }

  return (
    <div className="Login_Container">
      <h1>Login Page</h1>

      <form onSubmit={submit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input type="submit" value="Login" />
        </div>
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup Page</Link>
    </div>
  );
}
export default Login;
