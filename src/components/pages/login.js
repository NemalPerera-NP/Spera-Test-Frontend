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

      // const response = await axios.post(Login_url, {
      //   username,
      //   password,
      // });

      // if (response.data.success == true) {
      //   // Assuming the login was successful and you want to redirect
      //   navigate("/home");
      // } else if (response.data.message) {

      // } {
      //   // Handle other statuses accordingly
      //   alert(`Login failed: ${response.data.message}`);
      // }
      await axios
        .post(Login_url, {
          username,
          password,
        })
        .then((res) => {
          if (res.status === 201) {
            navigate("/home");
          } else if (res.data === "User not found") {
            alert("User not found");
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log("e....", e);
        });
    } catch (error) {
      console.log(error);
      alert("Login failed. Please check your details and try again.");
    }
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
