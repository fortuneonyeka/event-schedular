import React , {useState} from "react";

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "./basic.css"
import Modal from "../modal/Modal";

const localizer = momentLocalizer(moment);


const BasicCalendar = () => { 
      const [events, setEvents] = useState([])
      const [showModal, setShowModal] = useState(false)
      const [selectedDate, setSelectedDate] = useState(null)
      const [eventTitle, setEventTitle] = useState("")


      const handleSelectSlot = (slotInfo) => {
            setShowModal(true);
            setSelectedDate(slotInfo.start);
      }

      const saveEvent = () => {
            if (eventTitle && selectedDate) {
                 const newEvent = {
                  title: eventTitle,
                  start: selectedDate,
                  end: moment(selectedDate).add(1, "hours").toDate(),
                 };
                 setEvents([...events, newEvent]);
                 setShowModal(false);
                 setEventTitle("");
            }
      }

  return (
<div style={{height: "800px"}}>
<Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ margin: "50px" }}
      selectable={true}
      onSelectSlot={handleSelectSlot}
    />
    {showModal && (
      <Modal saveEvent={saveEvent} eventTitle={eventTitle} setEventTitle={(e) => setEventTitle(e.target.value)} setShowModal={() => setShowModal(false)}/>
    )}
</div>
  );
};

export default BasicCalendar;
