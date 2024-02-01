import React, { useEffect, useState } from 'react';
import './events.css'; // Import your CSS file

const Events = () => {
  const [storedEvents, setStoredEvents] = useState([]);

  useEffect(() => {
    const eventsFromLocalStorage = JSON.parse(localStorage.getItem("events")) || [];
    setStoredEvents(eventsFromLocalStorage);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderEvents = () => {
    return storedEvents.map((event) => (
      <div key={event.id} className="event-item">
        <h3>{event.title}</h3>
        <p>Start: {formatDate(event.start)}</p>
        <p>End: {formatDate(event.end)}</p>
      </div>
    ));
  };

  return (
    <div className="event-container">
      {renderEvents()}
    </div>
  );
};

export default Events;
