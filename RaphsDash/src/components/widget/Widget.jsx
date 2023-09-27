import React from "react";
import "./widget.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EventIcon from "@mui/icons-material/Event";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function Widget({ type }) {
  let data;

  // temp
  const amount = 500;
  const diff = 20;

  switch (type) {
    case "contacts":
      data = {
        title: "CONTACTS",
        isMoney: false,
        link: "See all contacts",
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "events":
      data = {
        title: "EVENTS",
        isMoney: false,
        link: "See all events",
        icon: (
          <EventIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earnings":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "See net earnings",
        icon: (
          <CurrencyExchangeIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0, 128, 0, 0.2)" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See balance",
        icon: (
          <AccountBalanceWalletIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <ArrowUpwardIcon />
        <div className="percentage positive">{diff}%</div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
