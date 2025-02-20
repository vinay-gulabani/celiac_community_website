import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import AuthContext
import { auth } from "../firebase/firebaseConfig"; // Import Firebase Auth
import "./Header.css";

const Header = () => {
  const { user } = useAuth(); // Access current user from AuthContext
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
  };

  const closeDropdowns = () => {
    setIsNavOpen(false);
    setIsProfileDropdownOpen(false);
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      closeDropdowns();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="header">
<div className="app-title">Flourless Haven</div>
<img src="/images/logo_gd2.png" alt="Libre De Gluten Logo" className="app-logo" />

      <nav className={`navbar ${isNavOpen ? "show" : ""}`}>
        <ul className={`nav-links ${isNavOpen ? "show" : ""}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeDropdowns} title="Home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-story"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeDropdowns} title="My Story"
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeDropdowns} title="AI Generated Recipes"
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeDropdowns} title="Blogs"
            >
              Digest
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/restaurant-finder"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeDropdowns} title="Restaurants"
            >
              Dine In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeDropdowns} title="Contact Us"
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        <button onClick={toggleDarkMode} className="dark-mode-btn" title="Dark Mode">◑</button>
        <div className="profile-menu">
          <button onClick={toggleProfileDropdown} className="profile-btn">
            Profile
          </button>
          {isProfileDropdownOpen && (
            <ul className="profile-dropdown">
            {user ? (
              <>
                <li>
                  <button className="dropdown-btn"
                    onClick={() => {
                      navigate("/dashboard");
                      closeDropdowns();
                    }} title="Dashboard"
                  >
                  Dashboard
                  </button>
                </li>
                <li>
                  <button className="dropdown-btn" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="dropdown-btn"
                    onClick={() => {
                      navigate("/login");
                      closeDropdowns();
                    }} title="Login"
                  >Login</button>
                </li>
                <li>
                  <button className="dropdown-btn"
                    onClick={() => {
                      navigate("/signup");
                      closeDropdowns();
                    }} title="Sign Up"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
          )}
        </div>
      </nav>
      <button className="nav-button" onClick={toggleNav}>☰</button>
    </header>
  );
};

export default Header;
