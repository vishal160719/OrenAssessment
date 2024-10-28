import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        navigate('/dashboard'); 
      } else {
        alert(data.message); 
      }
    } catch (error) {
      console.error('Error during signup:', error); 
      alert('An error occurred: ' + error.message);
    }
  };
  

  return (
    <div className="form-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup}>
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
        
        <button type="submit" className="form-button">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default SignupPage;
