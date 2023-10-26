import React from "react";
import "./dayeventcard.scss";
import { useState, useEffect } from "react";

function DayEventCard(props) {
  // the event associated with this card
  const eventObject = props.eventObject;
  //console.log(JSON.stringify(eventObject));

  // the date
  const startDate = eventObject.start_time.slice(0, 10);

  // the start time and end time
  const startTime = eventObject.start_time.slice(11, 16);
  const endTime = eventObject.end_time.slice(11, 16);

  const [topMargin, setTopMargin] = useState([]);
  const [cardHeight, setCardHeight] = useState([]);

  // 2023-05-06T16:30:00Z

  const title = eventObject.title;

  const getMarginTop = () => {
    const hour = parseInt(startTime.slice(0, 2));
    // console.log("Hour card" + hour);
    //Hour10
    const mins = parseInt(startTime.slice(3, 5));
    // console.log("Minute card" + mins);
    // Minute9
    const daypx = hour * 60 + mins + 10;
    //console.log("daypx");

    //console.log(daypx);
    return daypx;
  };

  const getHeight = () => {
    const startHour = parseInt(startTime.slice(0, 2));
    const startMins = parseInt(startTime.slice(3, 5));
    // the start time in mins of day
    const startTotalMins = startHour * 60 + startMins;

    const endHour = parseInt(endTime.slice(0, 2));
    const endMins = parseInt(endTime.slice(3, 5));
    const endTotalMins = endHour * 60 + endMins;

    // time slot boxes are 60px
    const totalMins = endTotalMins - startTotalMins;

    return totalMins;
  };

  // when the event object received as props changes, reset the height and margin values
  useEffect(() => {
    setTopMargin(getMarginTop);
    setCardHeight(getHeight);
  }, [eventObject]);

  return (
    <div
      className="dayEventCard"
      style={{ marginTop: topMargin, height: cardHeight }}
    >
      <div className="eventDataWrapper">
        <span className="eventData">{title}</span>
        <span className="eventData">
          Time: {startTime} to {endTime}
        </span>
      </div>
    </div>
  );
}

export default DayEventCard;
