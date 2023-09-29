import React from "react";
import dayjs from "dayjs";
import "./timebar.scss";

function TimeBar(props) {
  const now = dayjs();

  const getMarginTop = (now) => {
    const hour = now.hour();
    const mins = now.minute();
    const daypx = hour * 60 + mins - 2;
    return daypx;
  };

  const getMarginLeft = (now) => {
    const dayOfWeek = now.day();
    const newMarginLeft = dayOfWeek * 12.5 + 12.5;
    const strVer = newMarginLeft.toString() + "%";
    return strVer;
  };

  return (
    <div
      ref={props.innerRef}
      className="timeBar"
      style={{ display: props.innerDisplay ,marginTop: getMarginTop(now), marginLeft: getMarginLeft(now) }}
    ></div>
  );
}

export default TimeBar;
