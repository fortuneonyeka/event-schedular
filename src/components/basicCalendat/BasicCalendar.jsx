import React, { useState, useEffect, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./basic.css";
import Modal from "../modal/Modal";
import Events from "../Events";

const localizer = momentLocalizer(moment);

const BasicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);

  const today = moment().startOf("day");

  const storedEvents = useMemo(
    () => JSON.parse(localStorage.getItem("events")) || [],
    []
  );

  useEffect(() => {
    if (storedEvents.length > 0) {
      setEvents(storedEvents);
    }

    const filteredEvents = storedEvents.filter((event) => {
      const eventStart = moment(event.start);
      const thirtyDaysAgo = moment().subtract(30, "days");
      return eventStart.isSameOrAfter(thirtyDaysAgo);
    });

    localStorage.setItem("events", JSON.stringify(filteredEvents));



  }, [storedEvents]);

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
          end: moment(selectedDate).endOf("day").toDate(),
          allDay: true,
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
    if (selectEvent) {
      const updatedEvent = { ...selectEvent, title: eventTitle };

      const updatedEvents = events.map((event) =>
        event.id === selectEvent.id ? updatedEvent : event
      );

      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
    }
  };

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
    const eventStart = moment(event.start).startOf("day");

    if (eventStart.isBefore(today, "day")) {
      return {
        style: {
          textDecoration: "line-through",
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
        views={["month", "agenda"]}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        eventPropGetter={eventStyleGetter}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}
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
