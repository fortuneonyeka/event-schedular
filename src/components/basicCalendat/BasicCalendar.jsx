import React from "react";
import moment from "moment";
import Calendar from "../Calendar";
import { Views } from "react-big-calendar";
import { useMemo } from "react";
import "./basic.css"


const events = [
  {
    start: moment("2024-01-26T13:00:00").toDate(),
    end: moment("2024-01-26T16:00:00").toDate(),
    title: "Take Home",
    data:{
      type: "Visit"
    }
  },
  {
    start: moment("2024-01-24T16:00:00").toDate(),
    end: moment("2024-01-24T16:30:00").toDate(),
    title: "Meeting ",
    data:{
      type: "Appointment"
    }
  },
];

const components = {
      event: (props) => {
           const  evenType = props?.event?.data?.type;
           switch (evenType) {
            case "Appointment":
                  return (
                        <div style={{color:"gold", height:"100%"}}>{props.title}
                        </div>
                  );
                  
            case "Visit":
                  return (
                        <div style={{ color:"white", height:"100%"}}>{props.title}</div>
                  )
            default:
                  break;
           }
            return null
      }
}

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
      components={components}
    />
  );
};

export default BasicCalendar;
