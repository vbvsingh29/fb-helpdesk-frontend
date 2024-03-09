import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignup = () => {
    // Make HTTP request to register endpoint
    axios.post("http://localhost:5000/api/auth/register", {
      name: name,
      email: email,
      password: password
    })
    .then(response => {
      // Save token to local storage or state for future use
      const token = response.data.token;
      localStorage.setItem("token", token); // Save token to local storage
      // Redirect user to profile or dashboard page
      // Replace '/profile' with the desired path
      window.location.href = "/profile";
    })
    .catch(error => {
      // Handle error
      if (error.response && error.response.data && error.response.data.errors) {
        // Set errors received from the API response
        setErrors(error.response.data.errors.reduce((acc, curr) => {
          acc[curr.path] = curr.msg;
          return acc;
        }, {}));
      } else {
        console.error("Error:", error);
      }
    });
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="App">
      <div className="register-container">
        <div className="register-card">
          <h2>Register for an account</h2>
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {errors.name && <p className="error">{errors.name}</p>}
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <div className="input-group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
            />
            <label>Remember me</label>
          </div>
          <button onClick={handleSignup}>Signup</button>
          <p>
            Already registered? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
