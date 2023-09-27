import React from "react";
import Widget from "../components/widget/Widget";
import "../pagescss/home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="contacts" />
          <Widget type="events" />
          <Widget type="earnings" />
          <Widget type="balance" />
        </div>
        <div className="charts"></div>
      </div>
    </div>
  );
};

export default Home;
