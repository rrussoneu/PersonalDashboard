import React from "react";
import dayjs from "dayjs";
import "./daytimebar.scss";

function DayTimeBar(props) {
  const now = dayjs();

  const getMarginTop = (now) => {
    const hour = now.hour();
    const mins = now.minute();
    const daypx = hour * 60 + mins - 2;
    return daypx;
  };

  return (
    <div
      ref={props.innerRef}
      className="dayTimeBar"
      style={{ display: props.innerDisplay, marginTop: getMarginTop(now) }}
    ></div>
  );
}

export default DayTimeBar;
