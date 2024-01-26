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
      
    />
  );
};

export default BasicCalendar;
