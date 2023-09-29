import React from "react";
import MiniCalendar from "../components/minicalendar/MiniCalendar";
import "../pagescss/calendar.scss";
import CalendarContext from "../context/CalendarContext";
import { useState } from "react";
import dayjs from "dayjs";
import WeekCalendar from "../components/weekcalendar/WeekCalendar";
import CreateEvent from "../components/dailyschedule/createevent/CreateEvent";

function Calendar() {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [currDay, setCurrDay] = useState(dayjs());

  return (
    <CalendarContext.Provider
      value={{
        monthIndex: [monthIndex, setMonthIndex],
        currDay: [currDay, setCurrDay],
      }}
    >
      <div className="calendarWrapper">
        <div className="calendarInsideWrapper">
          <div className="calendarSidebar">
            <div className="miniCalendar">
              <MiniCalendar />
            </div>
            <div className="createEvent">
              <span style={{ fontSize: "20px" }}> New Event:</span>
              <CreateEvent />
            </div>
          </div>
          <div className="calendarMain">
             <WeekCalendar />
          </div>
        </div>
      </div>
    </CalendarContext.Provider>
  );
}

export default Calendar;
