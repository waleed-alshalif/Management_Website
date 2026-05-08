import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
      <div className="sidebar-content">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="menu">
          <li>
            <Link to="/dashboard" className="menu-item active-menu">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/alluser" className="menu-item">
              Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/employes" className="menu-item">
              Employees
            </Link>
          </li>
          <li>
            <Link to="/dashboard/offices" className="menu-item">
              Offices
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="menu-item">
              Devices
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="menu-item">
              Our Version
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
