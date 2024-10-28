import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import orenLogo from './orenlogo.webp';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function Header() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/dashboard') {
    return null;
  }

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="App-header">
      <img src={orenLogo} alt="Oren Logo" className="logo" />
      <div className="menu-container">
        <button className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <a href="#product">Product</a>
          <a href="#solutions">Solutions</a>
          <a href="#resources">Resources</a>
          <a href="#about">About Us</a>
          <a href="#partners">Partners</a>
          <a href="#careers">Careers</a>
          <Link to="/login">
            <button className="demo-button">Login</button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <main className="main-content">
      <div className="trusted-banner">
        Trusted by Leading Sustainability Professionals Worldwide
      </div>
      <h1 className="headline">
        <span>All your sustainability data</span> <br />
        <span>and stakeholders connected in one place</span>
      </h1>
      
      <div className="features">
        <div className="feature-item">Regulatory Disclosure</div>
        <div className="feature-item">Supply Chain Sustainability</div>
        <div className="feature-item">GHG Emissions Tracking</div>
        <div className="feature-item">Custom Reporting</div>
      </div>
      
      <button className="cta-button">Let's Talk</button>
    </main>
  );
}

export default App;
