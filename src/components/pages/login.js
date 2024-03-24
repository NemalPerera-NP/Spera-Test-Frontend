// In Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/loginStyles.css";

const Login_url = "http://localhost:8080/api/auth/login";

function Login() {
  //local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
  };

  return (
    <div className="Login_Container">
      <h1>Login Page</h1>

      <form action="POST">
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
        </div>
        <input type="submit" />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup Page</Link>
    </div>
  );
}
export default Login;
