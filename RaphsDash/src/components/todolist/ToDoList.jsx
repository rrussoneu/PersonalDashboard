import { Button, Popover } from "@mui/material";
import React, { useState } from "react";
import "./todolist.scss";
import ToDoItem from "./todoitem/ToDoItem";
import { useEffect } from "react";
import axios from "../../api/axios";
import dayjs from "dayjs";
import NewToDo from "./newtodo/NewToDo";

const TODO_URL = "PersonalDashApp/todos/";

function ToDoList() {
  const [allToDos, setAllToDos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todayToDos, setTodayToDos] = useState([]);
  const [otherToDos, setOtherToDos] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleNewClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNewClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popId = open ? "simple-popover" : undefined;

  const handleToDos = () => {
    console.log("here");
    try {
      const response = axios({
        // put url and all that jazz in other file
        method: "get",
        // switch back to auth.userId
        url: `${TODO_URL}`,
        headers: {
          "Content-Type": "application/json",
          // switch back to auth.accessToken
          Authorization: `Token ${localStorage.getItem("accessToken")}`,
        },
        params: {
          owner: localStorage.getItem("userId"),
          date: dayjs().format("YYYY-MM-DD"),
        },
      }).then((response) => {
        console.log(response.data)
        setAllToDos(response.data);
        setIsLoading(false);
      });
      console.log("To Dos: " + JSON.stringify(allToDos));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleToDos();
  }, []);

  return (
    <div className="todolist">
      <div className="todolistheader">
        <span className="title">To Do:</span>
        <Button
          onClick={handleNewClick}
          variant="outlined"
          className="toDoButton"
        >
          New
        </Button>
        <Popover
          id={popId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleNewClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <NewToDo />
        </Popover>
      </div>
      <hr />
      <div className="toDoBody">
        <div className="toDoBodySection">
          <div className="toDoBodyTitle">
            <span className="toDoTitle">Tasks</span>
          </div>
          <div className="toDoBodyMain">
            {isLoading ? (
              <span>Loading To Do List</span>
            ) : (
              allToDos.map((toDo, idx) => <ToDoItem key={idx} toDo={toDo} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
