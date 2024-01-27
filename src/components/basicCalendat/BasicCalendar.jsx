import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "./basic.css";
import Modal from "../modal/Modal";

const localizer = momentLocalizer(moment);

const BasicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");

  const today = moment().startOf('day');

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
  }

  const saveEvent = () => {
    if (eventTitle && selectedDate) {
      const selected = moment(selectedDate).startOf('day');

      if (selected.isSameOrAfter(today)) {
        const newEvent = {
          title: eventTitle,
          start: selectedDate,
          end: moment(selectedDate).add(1, "hours").toDate(),
        };
        setEvents([...events, newEvent]);
        setShowModal(false);
        setEventTitle("");
      } else {
        alert("You can only add events for today and future dates.");
      }
    }
  }

  return (
    <div style={{ height: "800px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        min={today.toDate()} // Set minimum date to today
      />
      {showModal && (
        <Modal
          saveEvent={saveEvent}
          eventTitle={eventTitle}
          setEventTitle={(e) => setEventTitle(e.target.value)}
          setShowModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BasicCalendar;
