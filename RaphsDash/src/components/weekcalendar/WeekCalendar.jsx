import dayjs from "dayjs";
import React, { useState, useEffect, useContext, useRef } from "react";
import CalendarContext from "../../context/CalendarContext";
import { getWeek } from "../../util/GetWeekUtil";
import "./weekcalendar.scss";
import axios from "../../api/axios";
import WeekEventCard from "./weekeventcard/weekeventcard";
import TimeBar from "./timebar/TimeBar";

const EVENT_URL = "PersonalDashApp/events/";

function WeekCalendar() {
  const { monthIndex, currDay } = useContext(CalendarContext);
  const [isLoading, setIsLoading] = useState(false);
  const [weekDayObjs, setWeekDayObjs] = useState(getWeek());
  const [currWeekEvents, setCurrWeekEvents] = useState([]);
  const barRef = useRef();
  const [displayBar, setDisplayBar] = useState("flex");
  const [currWeek, setCurrWeek] = useState(dayjs());

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

  const handleEvents = () => {
    const serializedDates = weekDayObjs.map((date) =>
      date.format("YYYY-MM-DD")
    );

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
          dates: serializedDates,
        },
      }).then((response) => {
        //console.log(response.data);
        setCurrWeekEvents(response.data);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetToday = () => {
    currDay[1](dayjs());
    monthIndex[1](dayjs().month());
  };

  /*
  useEffect(() => {
    if (barRef.current) {
      barRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);
  */
  useEffect(() => {
    //console.log(currDay[0]);
    setIsLoading(true);
    const newDays = [];
    for (let i = 0; i < 7; i++) {
      const newDay = currDay[0].startOf("week").add(i, "day");
      newDays.push(newDay);
    }
    for (let i = 0; i < 7; i++) {
      if (newDays[i].format("YYYY-MM-DD") == dayjs().format("YYYY-MM-DD")) {
        setDisplayBar("flex");
        barRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setDisplayBar("flex"); // bar issue - had set to none while resolving other things
      }
    }
    setWeekDayObjs(newDays);
  }, [currDay[0]]);

  useEffect(() => {
    handleEvents();
    setCurrWeek(weekDayObjs[0]);
  }, [weekDayObjs]);

  //console.log(currDay)
  return (
    <div className="weekCalendarWrapper">
      <div className="weekCalendarHeader">
        <span className="monthTitle"> {currDay[0].format("MMMM")}</span>
        <button className="todayButton" onClick={handleResetToday}>
          {" "}
          Today
        </button>
      </div>
      <hr />
      <div className="weekCalendarBody">
        <div className="weekDayNames">
          <span className="timeHolder">Time</span>
          {weekDayObjs.map((day, idx) => (
            <div className="weekDayNameWrapper" key={idx}>
              <span className="weekDayName">{day.format("ddd")}</span>
              <br />
              <span className="weekDayName">{day.format("DD")}</span>
            </div>
          ))}
        </div>
        <div className="mainBodySlots">
          {hourSlot.map((hour, idx) => (
            <div className="hourSlot" key={idx}>
              <div className="timeSlot" style={{ textAlign: "center" }}>
                {hour}
              </div>
              {weekDayObjs.map((i) => (
                <div className="timeSlot" key={i}></div>
              ))}
            </div>
          ))}

          {isLoading ? (
            <span>Loading Events</span>
          ) : (
            currWeekEvents.map((dayEvent, idx) => (
              <WeekEventCard key={idx} eventObject={dayEvent} />
            ))
          )}
          <TimeBar
            innerRef={barRef}
            innerDisplay={displayBar}
            currWeek={currWeek}
          />
        </div>
      </div>
    </div>
  );
}

export default WeekCalendar;
