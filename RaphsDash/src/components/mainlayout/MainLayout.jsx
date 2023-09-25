import React from "react";
import { Route, Routes } from "react-router-dom";
//import Home from "../../pages/Home";
import "./mainlayout.scss";

function MainLayout() {
  return (
    <div className="mainLayout">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />


          <Routes>
          </Routes>
        
      </div>
    </div>
  );
}

export default MainLayout;
