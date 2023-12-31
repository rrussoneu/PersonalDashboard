import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./timebar.scss";

function TimeBar(props) {
  //const now = dayjs();

  const [currentTime, setCurrentTime] = useState(dayjs());

  // update the time bar every two minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const getMarginTop = (currentTime) => {
    const hour = currentTime.hour();
    const mins = currentTime.minute();
    const daypx = hour * 60.5 + mins - 2;
    return daypx;
  };

  const getMarginLeft = (currentTime) => {
    const dayOfWeek = currentTime.day();
    const newMarginLeft = dayOfWeek * 12.5 + 12.5;
    const strVer = newMarginLeft.toString() + "%";
    return strVer;
  };

  const isCurrentWeek = dayjs().isSame(props.currWeek, "week");
  const displayTimeBar = isCurrentWeek ? "flex" : "none";

  return (
    <div
      ref={props.innerRef}
      className="timeBar"
      style={{
        display: displayTimeBar,
        marginTop: getMarginTop(currentTime),
        marginLeft: getMarginLeft(currentTime),
      }}
    ></div>
  );
}

export default TimeBar;
