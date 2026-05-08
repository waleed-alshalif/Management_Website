import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const TopBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const name = cookies.get("Username");
    if (name) setUsername(name);
  }, []);

  const handleLogout = () => {
    cookies.remove("Username");
    setUsername(null);
    setShowMenu(false);
    navigate("/main");
  };

  return (
    <div className="home-topbar">
      <div className="logo">WaleedTechno</div>

      <nav className="nav-links">
        <Link to="/main">Home</Link>
        <Link to="/service">Services</Link>
        <Link to="/login">Dashboard</Link>
        <Link to="/content">About Us</Link>
      </nav>

      <div className="auth-buttons">
        {username ? (
          <div className="user-dropdown">
            <button className="user-btn" onClick={() => setShowMenu(!showMenu)}>
              {username}
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
            <Link to="/login" className="btn secondary">
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
