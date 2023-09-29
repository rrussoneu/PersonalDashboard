import dayjs from "dayjs";
import React, { useState, useContext, useEffect } from "react";
import CalendarContext from "../../context/CalendarContext";
import { getMonth } from "../../util/GetMonthUtil";
import "./minicalendar.scss";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import MiniCalendarDay from "./minicalendarday/MiniCalendarDay";

function MiniCalendar() {
  const { monthIndex, currDay } = useContext(CalendarContext);
  const [miniMonth, setMiniMonth] = useState(getMonth());
  const [miniMonthIdx, setMiniMonthIdx] = useState(getMonth());

  useEffect(() => {
    setMiniMonthIdx(monthIndex[0]);
  }, []);

  useEffect(() => {
    setMiniMonth(getMonth(miniMonthIdx));
  }, [miniMonthIdx]);

  // if the context changes from elsewhere go back to the current month
  useEffect(() => {
    setMiniMonthIdx(monthIndex[0]);
  }, [monthIndex[0]]);

  // set local month index one back
  function handlePrevMonth() {
    setMiniMonthIdx(miniMonthIdx - 1);
  }

  // set local month index one forward
  function handleNextMonth() {
    setMiniMonthIdx(miniMonthIdx + 1);
  }

  function handleReset() {
    setMiniMonthIdx(dayjs().month());
    monthIndex[1](dayjs().month());
    currDay[1](dayjs());
  }

  return (
    <div className="miniCalendarWrapper">
      <div className="miniCalendarHeader" style={{ display: "flex" }}>
        <span className="monthTitle">{miniMonth[1][0].format("MMM")}</span>
        <div className="navButtons">
          <IconButton sx={{ p: 0 }} onClick={handlePrevMonth}>
            <NavigateBeforeIcon sx={{ justifyContent: "center", p: 0 }} />
          </IconButton>
          <IconButton sx={{ p: 0 }} onClick={handleNextMonth}>
            <NavigateNextIcon sx={{ justifyContent: "center", p: 0 }} />
          </IconButton>
        </div>
      </div>
      <div className="weekDays">
        {miniMonth[0].map((day, idx) => (
          <span key={idx} className="weekDay">
            {day.format("dd")}
          </span>
        ))}
      </div>
      <div className="miniCalendarBody">
        {miniMonth.map((week, idx) => (
          <div key={idx} className="miniWeek">
            {week.map((day, i) => (
              <MiniCalendarDay key={i} day={day} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;
