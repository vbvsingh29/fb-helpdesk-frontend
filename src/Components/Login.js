import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember me:", rememberMe);
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="App">
      <div className="login-container">
        <div className="login-card">
          <h2>Login into your account</h2>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="checkbox" checked={rememberMe} onChange={handleCheckboxChange} />
            <label>Remember me</label>
          </div>
          <button onClick={handleLogin}>Login</button>
          <p>New to App? <Link to="/register">Signup</Link></p>
        </div>
      </div>
    </div>
  );
}

export default App;
