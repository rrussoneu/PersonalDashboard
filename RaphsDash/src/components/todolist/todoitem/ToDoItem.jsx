import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "../../../api/axios";
import "./todoitem.scss";

function ToDoItem(props) {
  const toDoObj = props.toDo;

  const [isComplete, setIsComplete] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState("flex");

  const title = toDoObj.title;

  const handleComplete = () => {
    setIsComplete(true);
    setShouldDisplay("none");
    axios.delete(`PersonalDashApp/todos/${toDoObj.id}`);

    try {
      const response = axios({
        // put url and all that jazz in other file
        method: "delete",
        url: `PersonalDashApp/todos/${toDoObj.id}`,
        headers: {
          "Content-Type": "application/json",
          // switch back to auth.accessToken
          Authorization: `Token ${localStorage.getItem("accessToken")}`,
        },
      }).then();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="toDoItem" style={{ display: shouldDisplay }}>
      <div className="toDoItemContainer">{title}</div>
      <br />
      <div className="toDoItemContainer">{toDoObj.notes}</div>
      <div className="toDoItemContainer">
        <Button onClick={handleComplete}>Remove</Button>
      </div>
    </div>
  );
}

export default ToDoItem;
