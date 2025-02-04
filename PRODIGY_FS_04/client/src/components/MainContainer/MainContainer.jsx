import React from "react";
import "./MainContainer.css";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  return (
    <div className="maincontainer">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainContainer;
