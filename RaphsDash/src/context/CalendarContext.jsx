import React, { useState, createContext } from "react";
import dayjs from "dayjs";

const CalendarContext = createContext({
  monthIndex: 0,
  // Real initial value comes in the wrapper
  setMonthIndex: (index) => {},
  // Have function to change this value
});

function CalendarContextWrapper(props) {
  //props is the whole calendar
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [currDay, setCurrDay] = useState(dayjs());

  return (
    <CalendarContext.Provider
      value={{
        monthIndex: [monthIndex, setMonthIndex],
        // so currDay[0] should just give the day
        currDay: [currDay, setCurrDay],
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
}

export default CalendarContext;