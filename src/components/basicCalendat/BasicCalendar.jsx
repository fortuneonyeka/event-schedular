import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./basic.css";
import Modal from "../modal/Modal";

const localizer = momentLocalizer(moment);

const BasicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);

  const today = moment().startOf("day");

  const handleSelectSlot = (slotInfo) => {
    if (moment(slotInfo.start).isSameOrAfter(today, "day")) {
      setShowModal(true);
      setSelectedDate(slotInfo.start);
      setSelectEvent(null);
    } else {
      alert("You can only add events for today and future dates.");
    }
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const saveEvent = () => {
    if (eventTitle && selectedDate) {
      const selected = moment(selectedDate).startOf("day");

      if (selected.isSameOrAfter(today)) {
        if (selectEvent) {
          const updatedEvent = { ...selectEvent, title: eventTitle };
          const updatedEvents = events.map((event) =>
            event === selectEvent ? updatedEvent : event
          );
          setEvents(updatedEvents);
        } else {
          const newEvent = {
            title: eventTitle,
            start: selectedDate,
            end: moment(selectedDate).add(1, "hours").toDate(),
          };
          setEvents([...events, newEvent]);
        }
        setShowModal(false);
        setEventTitle("");
        setSelectEvent(null);
      } else {
        alert("You can only add events for today and future dates.");
      }
    }
  };

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
        onSelectEvent={handleSelectedEvent}
        min={today.toDate()} // Set minimum date to today
      />
      {showModal && (
        <Modal
          saveEvent={saveEvent}
          eventTitle={eventTitle}
          setEventTitle={(e) => setEventTitle(e.target.value)}
          setShowModal={() => {
            setShowModal(false);
            setEventTitle("");
            setSelectEvent(null);
          }}
          selectEvent={selectEvent}
        />
      )}
    </div>
  );
};

export default BasicCalendar;
