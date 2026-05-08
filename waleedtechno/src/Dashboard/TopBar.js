import React, { useState } from "react";
import "../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function TopBar() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const username = cookies.get("Username") || "User"; // تأكد أنك خزّنت الاسم تحت "Username"
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    cookies.remove("Username");
    navigate("/main");
  };

  return (
    <header className="topbar">
      <h1>Dashboard</h1>
      <div className="topbar-actions">
        <div className="user-dropdown">
          <div
            className="username-display"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            👤 {username} ⌄
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <p className="dropdown-username">
                👋 Hello, <strong>{username}</strong>
              </p>
              <button className="logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
