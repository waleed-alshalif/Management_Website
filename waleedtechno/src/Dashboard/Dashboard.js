import React from "react";
import "../Styles/Dashboard.css";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <TopBar />
      <SideBar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
