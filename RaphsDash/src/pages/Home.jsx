import React from "react";
import Widget from "../components/widget/Widget";
import "../pagescss/home.scss";
import ToDoList from "../components/todolist/ToDoList";
import DailySchedule from "../components/dailyschedule/DailySchedule";
import DashContacts from "../components/dash_contacts/DashContacts";
//import Featured from "../components/featured/Featured";

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
        <div className="charts">
          <DailySchedule />
          <ToDoList />
          <DashContacts />
        </div>
      </div>
    </div>
  );
};

export default Home;
