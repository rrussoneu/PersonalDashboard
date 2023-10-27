import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./weekeventcard.scss";

function WeekEventCard(props) {
  const eventObject = props.eventObject;
  const startDate = eventObject.start_time.slice(0, 10);
  const startTime = eventObject.start_time.slice(11, 16);
  const endTime = eventObject.end_time.slice(11, 16);

  const [topMargin, setTopMargin] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [cardMarginLeft, setCardMarginLeft] = useState(0);

  const title = eventObject.title;

  const getMarginTop = () => {
    const hour = parseInt(startTime.slice(0, 2));
    // console.log("Hour card" + hour);
    //Hour10
    const mins = parseInt(startTime.slice(3, 5));
    // console.log("Minute card" + mins);
    // Minute9
    const daypx = hour * 60.5 + mins;
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

  const getMarginLeft = () => {
    const dayObj = dayjs(startDate);
    const dayOfWeek = dayObj.day();
    //console.log("Curr day is " + dayOfWeek);
    // Curr day is 6
    const newMarginLeft = dayOfWeek * 12.5 + 12.5;
    const strVer = newMarginLeft.toString() + "%";
    return strVer;
  };

  useEffect(() => {
    setTopMargin(getMarginTop);
    setCardHeight(getHeight);
    setCardMarginLeft(getMarginLeft);
  }, [eventObject]);

  return (
    <div
      className="weekEventCard"
      style={{
        marginTop: topMargin,
        height: cardHeight,
        marginLeft: cardMarginLeft,
      }}
    >
      <div className="eventDataWrapper">
        <span className="eventData">{title}</span>
      </div>
    </div>
  );
}

export default WeekEventCard;
