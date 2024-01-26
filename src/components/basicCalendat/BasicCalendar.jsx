import React from "react";
import moment from "moment";
import Calendar from "../Calendar";


const events = [
  {
    start: moment("2024-01-26T13:00:00").toDate(),
    end: moment("2024-01-26T16:00:00").toDate(),
    title: "Take Home",
  },
  {
    start: moment("2024-01-24T16:00:00").toDate(),
    end: moment("2024-01-24T16:30:00").toDate(),
    title: "Meeting ",
  },
];

const BasicCalendar = () => {
  return (
    <Calendar
      events={events}
      defaultView={"week"}
      views={["month", "week", "day"]}
      date={moment("2024-01-26").toDate()}
      // toolbar={false}
      max={moment("2024-01-26T19:00:00").toDate()}
      min={moment("2024-01-26T06:00:00")}
    />
  );
};

export default BasicCalendar;
