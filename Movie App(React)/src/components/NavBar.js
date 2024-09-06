import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout"; // Import logout icon
import "./NavBar.css"; // Import the CSS file

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // Clear login state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">Movie App</div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/genre/action">Action</Link>
          {/* <Link to="/genre/comedy">Comedy</Link>
          <Link to="/genre/horror">Horror</Link>
          <Link to="/genre/drama">Drama</Link> */}
        </div>
        <div className="navbar-icons">
          {/* Show logout button only if logged in */}
          {localStorage.getItem("loggedIn") === "true" && (
            <button onClick={handleLogout} className="logout-button">
              <LogoutIcon />
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
