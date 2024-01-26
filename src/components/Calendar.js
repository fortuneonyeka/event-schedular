import {
      Calendar as BigCalendar,
      CalendarProps,
      momentLocalizer,
    } from "react-big-calendar";
    import moment from "moment";
import React from "react";
    
    const localizer = momentLocalizer(moment);
    
    export default function Calendar(props) {
      return <BigCalendar {...props} localizer={localizer} />;
    }