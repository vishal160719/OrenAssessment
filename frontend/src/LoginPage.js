import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault(); 

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      alert(data.message); 
      localStorage.setItem('token', data.token); 
      navigate('/dashboard'); 
    } else {
      alert(data.message); 
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email ID</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" className="form-button">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}

export default LoginPage;
