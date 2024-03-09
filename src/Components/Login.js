import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
const navigate = useNavigate();
  const handleLogin = () => {
    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setError("");

    // Validate email and password
    if (!email) {
      setEmailError("Please enter your email.");
      return;
    }
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    // Make HTTP request to login endpoint
    axios
      .post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // Handle successful login
        console.log("Login successful");
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/profile", { replace: false });
      })
      .catch((error) => {
        // Handle error
        console.log(error.response.data.msg, "erer");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Set error message received from the API response
          setError(error.response.data.message);
        } else if (error.response.data.msg === "Invalid credentials") {
          setError("Invalid credentials");
        } else {
          setError("An error occurred while logging in."); // Generic error message
        }
      });
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-card">
          <h2>Login into your account</h2>
          {error && <p className="error">{error}</p>}
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <div className="input-group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
            />
            <label>Remember me</label>
          </div>
          <button onClick={handleLogin}>Login</button>
          <p>
            New to App? <Link to="/register">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
