import { Button, Icon, Popover } from "@mui/material";
import React from "react";
import "./dailyschedule.scss";
import dayjs from "dayjs";
import { useState, useRef, } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect } from "react";
import axios from "../../api/axios";
import DayEventCard from "./dayeventcard/DayEventCard";
import CreateEvent from "./createevent/CreateEvent";
import DayTimeBar from "./dailytimebar/DayTimeBar";

const EVENT_URL = "PersonalDashApp/events/";

function DailySchedule() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const barRef = useRef();
  const [displayBar, setDisplayBar] = useState("flex");
  const hourSlot = [
    "12:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
  ];
  const [currDay, setCurrDay] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(dayjs());

  const handleEvents = () => {
    try {
      const response = axios({
        // put url and all that jazz in other file
        method: "get",
        url: `${EVENT_URL}`,
        headers: {
          "Content-Type": "application/json",
          // switch back to auth.accessToken
          Authorization: `Token ${localStorage.getItem("accessToken")}`,
        },
        params: {
          owner: localStorage.getItem("userId"),
          date: selectedDay.format("YYYY-MM-DD"),
        },
      }).then((response) => {
        setSelectedDayEvents(response.data);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getDaysOfWeek = (day) => {
    const weekArray = Array.from({ length: 7 }, (_, i) => day.add(i, "day"));

    return weekArray;
  };

  const [daysOfWeek, setDaysOfWeek] = useState(
    getDaysOfWeek(selectedDay.startOf("week"))
  );
  const [month, setMonth] = useState(
    selectedDay.startOf("week").format("MMMM")
  );

  const checkToday = (day) => {
    if (day.format("DD/MM/YYYY") == currDay.format("DD/MM/YYYY")) {
      return "rebeccapurple";
    } else {
      return "black";
    }
  };

  const checkSelectedDay = (day) => {
    if (day.format("DD/MM/YYYY") == selectedDay.format("DD/MM/YYYY")) {
      return "1px solid";
    } else {
      return "none";
    }
  };

  const handleResetDay = () => {
    setSelectedDay(currDay);
    setDaysOfWeek(getDaysOfWeek(currDay.startOf("week")));
  };

  const handleBackWeek = () => {
    setDaysOfWeek(getDaysOfWeek(daysOfWeek[0].subtract(7, "day")));
  };

  const handleForwardWeek = () => {
    setDaysOfWeek(getDaysOfWeek(daysOfWeek[0].add(7, "day")));
  };

  useEffect(() => {
    setIsLoading(true);
    handleEvents();

    if (selectedDay.format("YYYY-MM-DD") == dayjs().format("YYYY-MM-DD")) {
      setDisplayBar("flex");
      barRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setDisplayBar("none");
    }
  }, [selectedDay]);

  useEffect(() => {
    setMonth(daysOfWeek[0].format("MMMM"));
  }, [daysOfWeek]);

  const handleCreateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreateClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="dailySchedule">
      <div className="dailyScheduleHeader">
        <span className="title">Daily Schedule</span>

        <Button
          onClick={handleResetDay}
          variant="outlined"
          className="todayButton"
        >
          Today
        </Button>
        <Button
          onClick={handleCreateClick}
          variant="outlined"
          className="todayButton"
        >
          New
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCreateClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <CreateEvent />
        </Popover>
      </div>
      <hr />
      <div className="dailyScheduleBody">
        <div className="dailyScheduleBodyHeader">
          <div className="miniHeader">
            <IconButton onClick={handleBackWeek}>
              <ArrowBackIosIcon />
            </IconButton>
            <span className="dailyScheduleMonth">{month}</span>
            <IconButton onClick={handleForwardWeek}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>

          <div className="week">
            {daysOfWeek.map((day, idx) => (
              <Button
                className="dayButton"
                //variant="outlined"
                key={idx}
                onClick={() => setSelectedDay(day)}
                sx={{ color: checkToday(day), border: checkSelectedDay(day) }}
              >
                {day.format("dd")} <br />
                {day.format("DD")}
              </Button>
            ))}
          </div>
        </div>
        <hr />
        <div className="dailyScheduleBodyMain">
          {hourSlot.map((hour, idx) => (
            <div className="timeSlot" key={idx}>
              <div className="hourSlot">{hour}</div>
            </div>
          ))}
          {isLoading ? (
            <span>Loading Events</span>
          ) : (
            selectedDayEvents.map((dayEvent, idx) => (
              <DayEventCard key={idx} eventObject={dayEvent} />
            ))
          )}
          <DayTimeBar innerRef={barRef} innerDisplay={displayBar} />
        </div>
      </div>
    </div>
  );
}

export default DailySchedule;
