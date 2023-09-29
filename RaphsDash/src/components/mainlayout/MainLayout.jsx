import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Calendar from "../../pages/Calendar";
import "./mainlayout.scss";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="mainLayout">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />


          <Routes>
          <Route path="home" element={<Home></Home>}></Route>
          <Route path="calendar" element={<Calendar></Calendar>}></Route>
          </Routes>
        
      </div>
    </div>
  );
}

export default MainLayout;
