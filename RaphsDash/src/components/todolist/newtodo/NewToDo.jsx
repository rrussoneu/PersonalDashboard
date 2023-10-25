import React, { useState } from "react";
import "./newtodo.scss";
import axios from "../../../api/axios";

const TODO_URL = "PersonalDashApp/todos/";

function NewToDo() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleToDoSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        TODO_URL,
        // need to do email: user because the backend expects "email" in the json
        JSON.stringify({
          owner: localStorage.getItem("userId"),
          title: title,
          notes: notes,
          complete: false,
          date: null,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      //setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setTitle("");
      setNotes("");
      window.location.reload();
    } catch (err) {
      if (!err?.response) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleToDoSubmit}>
          <div className="createToDo">
            <div className="createField">
              <label className="createLabel" htmlFor="title">
                Title:
              </label>
              <input
                className="createInput"
                type="text"
                id="title"
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div className="createField">
              <label className="createLabel" htmlFor="notes">
                Notes:
              </label>
              <input
                className="createInput"
                type="text"
                id="notes"
                autoComplete="off"
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                // aria-describedby="firstnamenote"
              />
            </div>
            <div className="buttonDiv">
              <button className="createButton"> Create </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewToDo;
