import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Raph's Dashes</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>
              <Link to="home" className="sidebarLink">
                Dashboard
              </Link>
            </span>
          </li>
          <li>
            <GroupIcon className="icon" />
            <span>
              <Link to="contacts" className="sidebarLink">
                Contacts
              </Link>
            </span>
          </li>
          <li>
            <CalendarMonthIcon className="icon" />
            <span>
              <Link to="calendar" className="sidebarLink">
                Calendar
              </Link>
            </span>
          </li>
          <p className="title">USER</p>

          <li>
            <AccountBoxIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span onClick={handleLogout}>Log Out</span>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <div className="colorOptions"></div>
        <div className="colorOptions"></div>
      </div>
    </div>
  );
}

export default Sidebar;
