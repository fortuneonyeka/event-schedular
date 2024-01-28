import React from "react";

const Events = () => {
  const storedEvents = JSON.parse(localStorage.getItem("events"));

  return (
    <div>
      {storedEvents.map((event) => (
        <ul key={event.id}>
          <li>{event.title}</li>
        </ul>
      ))}
    </div>
  );
};

export default Events;
