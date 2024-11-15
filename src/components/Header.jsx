import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Toggle navigation menu on mobile
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className="app-title">Celiac Community</div>
      
      <nav className="navbar">
        {/* Hamburger Button */}
        <button className="nav-button" onClick={toggleNav}>
          &#9776; {/* Unicode for hamburger icon */}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isNavOpen ? 'show' : ''}`}>
          <li><button onClick={() => { /* Handle navigation */ }}>Home</button></li>
          <li><button onClick={() => { /* Handle navigation */ }}>About</button></li>
          <li><button onClick={() => { /* Handle navigation */ }}>Blog</button></li>
          <li><button onClick={() => { /* Handle navigation */ }}>Contact</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
