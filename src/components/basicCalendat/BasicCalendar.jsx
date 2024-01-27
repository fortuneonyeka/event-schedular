import React, { useState, useEffect } from "react";
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

  const storedEvents = JSON.parse(localStorage.getItem("events")) || [];



  useEffect(() => {
    if (storedEvents.length > 0) {
      setEvents(storedEvents);
    }
  }, []);

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
        const newEvent = {
          id: events.length + 1,
          title: eventTitle,
          start: selectedDate,
          end: moment(selectedDate).add(4, "hours").toDate(),
        };

        storedEvents.push(newEvent);

        localStorage.setItem("events", JSON.stringify(storedEvents));

        setEvents((prev) => [...prev, newEvent]);

        setShowModal(false);
        setEventTitle("");
        setSelectedDate(null);
        setSelectEvent(null);
      } else {
        alert("You can only add events for today and future dates.");
      }
    }
  };

  const handleEdit = () => {
      const updatedEvent = { ...selectEvent, title: eventTitle };
      
      const updatedEvents = storedEvents.map((event) =>
        event.id === selectEvent.id ? updatedEvent : event
      );
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
  }

  const deleteEvents = (id) => {
    if (selectEvent) {
      const filteredEvents = storedEvents.filter((event) => event.id !== id);

      localStorage.setItem("events", JSON.stringify(filteredEvents));
      setEvents(filteredEvents);

      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
      const eventDate = moment(event.start).startOf("day");
      const currentDate = moment(selectedDate).startOf("day");
  
      if (eventDate.isSame(currentDate)) {
        return {
          style: {
            backgroundColor: "red",
          },
        };
      }
  
      return {};
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
        eventPropGetter={eventStyleGetter}
        min={today.toDate()}
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
          handleEdit={handleEdit}
          deleteEvents={deleteEvents}
          selectEvent={selectEvent}
        />
      )}
    </div>
  );
};

export default BasicCalendar;
