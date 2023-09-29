import dayjs from 'dayjs';
import React, { useContext } from 'react'
import CalendarContext from '../../../context/CalendarContext';
import './minicalendarday.scss'

function MiniCalendarDay(props) {
    const day = props.day;
    const { monthIndex, currDay } = useContext(CalendarContext);

    function handleClickDay() {
        monthIndex[1](day.$M);
        currDay[1](day);
      }

      const checkToday = (day) => {
        if (day.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY")) {
          return "purple";
        } else {
          return "black";
        }
      };
    
      const checkSelectedDay = (day) => {
        if (day.format("DD/MM/YYYY") == currDay[0].format("DD/MM/YYYY")) {
          return "1px solid";
        } else {
          return "none";
        }
      };

  return (
    <button className="dayButton" onClick={handleClickDay} style={{color: checkToday(day), border: checkSelectedDay(day)}}>{day.format('DD')}</button>
  )
}

export default MiniCalendarDay