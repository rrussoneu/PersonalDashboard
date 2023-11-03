import React, { useEffect, useState } from "react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import axios from "../../../api/axios";
import "./createevent.scss";
import { TextField } from "@mui/material";

const EVENT_URL = "PersonalDashApp/events/";

function CreateEvent(props) {
  const owner = localStorage.getItem("userId");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState({});
  const [startTime, setStartTime] = useState({});
  const [endTime, setEndTime] = useState({});
  const [description, setDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventType, setEventType] = useState("personal");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceRule, setRecurrenceRule] = useState(null);
  const [isInviteOnly, setIsInviteOnly] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [attendingUsers, setAttendingUsers] = useState([]);
  //const handleEvents = props.eventsFunc;

  const handleEventSumbit = async (e) => {
    e.preventDefault();
    console.log("EVENT CREATE");

    // 2023-05-12T07:05:00.542Z

    // need to subtract 4 hours because server is four hours ahead
    const newStart =
      eventDate + startTime.subtract(4, "h").toISOString().slice(10, 24);
    const newEnd =
      eventDate + endTime.subtract(4, "h").toISOString().slice(10, 24);

    try {
      const response = await axios.post(
        EVENT_URL,
        {
          owner: owner,
          title: eventTitle,
          description: description,
          start_time: newStart,
          end_time: newEnd,
          location: eventLocation,
          event_type: eventType,
          is_recurring: isRecurring,
          recurrence_rule: recurrenceRule,
          is_invite_only: isInviteOnly,
          invited_users: invitedUsers,
          attending_users: attendingUsers,
          date: eventDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      window.location.reload(); // put events in context and update there instead of reload
    } catch (err) {
      console.log(err);
    }

  };

  const handleTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  useEffect(() => {
    console.log(startTime);
  }, [startTime]);

  return (
    <section>
      <form onSubmit={handleEventSumbit}>
        <div className="eventInput">
          <TextField
            label="Title"
            value={eventTitle}
            onChange={handleTitleChange}
          />
        </div>

        <div className="eventInput">
          <DatePicker
            slotProps={{
              textField: {
                size: "small",
                error: false,
              },
            }}
            label="Date"
            value={eventDate}
            onChange={(newValue) => setEventDate(newValue.format("YYYY-MM-DD"))}
          />
        </div>
        <div className="eventInput">
          <TimePicker
            slotProps={{
              textField: {
                size: "small",
                error: false,
              },
            }}
            label="Start"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
          />
        </div>
        <div className="eventInput">
          <TimePicker
            slotProps={{
              textField: {
                size: "small",
                error: false,
              },
            }}
            label="End"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
          />
        </div>
        <div className="buttonDiv">
          <button className="createButton"> Create </button>
        </div>
      </form>
    </section>
  );
}

export default CreateEvent;
