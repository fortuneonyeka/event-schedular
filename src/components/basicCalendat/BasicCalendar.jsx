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

  // const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

  useEffect(() => {
    if (storedEvents.length > 0) {
      setEvents(storedEvents);
    }
  }, [storedEvents]);

  // const storedEvents = useMemo(() => {
  //   // Filter out past events before setting events state
  //   const filteredEvents = JSON.parse(localStorage.getItem("events") || "[]").filter(
  //     event => moment(event.start).startOf('day').isSameOrAfter(today)
  //   );
  //   return filteredEvents;
  // }, [today]);

  // Get stored events from local storage
  // const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
  // useEffect(() => {

  //   // Filter out past events
  //   const filteredEvents = storedEvents.filter(
  //     event => moment(event.start).startOf('day').isSameOrAfter(today)
  //   );

  //   // Update local storage with filtered events
  //   localStorage.setItem("events", JSON.stringify(filteredEvents));

  //   // Update events state
  //   setEvents(filteredEvents);
  // }, [storedEvents, today]);

  // const filteredEvents = storedEvents.filter(
  //   event => moment(event.start).startOf('day').isSameOrAfter(today)
  // );

  // // Update local storage with filtered events
  // localStorage.setItem("events", JSON.stringify(filteredEvents));

  // // Update events state
  // setEvents(filteredEvents);

  // const getEventsByDay = () => {
  //   const newEvents = storedEvents.filter((event) =>
  //     moment(event.start).startOf("week").isSameOrAfter(today)
  //   );

  //   console.log(newEvents, 'new events');
  //   setEvents(newEvents);
  // };

  // useEffect(() => {
  //   getEventsByDay();
  // }, []);

  console.log({storedEvents})

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

  // console.log({ events, storedEvents });

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
        // eventPropGetter={eventStyleGetter}
        min={today.toDate()}
      />

      <Events events={events} storedEvents={storedEvents} />
      {/* <Entes storedEvents={storedEvents}/> */}

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
