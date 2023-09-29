import dayjs from "dayjs";

export function getWeek(day = dayjs()) {
  let weekArr = [];

  for (let i = 0; i < 7; i++) {
    const newDay = day.startOf("week").add(i, "day");

    weekArr.push(newDay);
  }
  return weekArr;
}
