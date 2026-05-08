import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import "../Styles/Home.css";

export default function Layout() {
  return (
    <div className="home-container">
      <TopBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
