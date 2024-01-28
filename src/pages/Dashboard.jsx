import React, { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [storedEvents, setStoredEvents] = useState([]);
  const [numberOfStoredEvents, setNumberOfStoredEvents] = useState(0);
  const statsData = [
    { title: "Total Users", value: "1000" },
    { title: "Total Events", value: numberOfStoredEvents },
    { title: "Total Revenue", value: "$5000" },
  ];

  useEffect(() => {
    const eventsFromLocalStorage =
      JSON.parse(localStorage.getItem("events")) || [];
    setStoredEvents(eventsFromLocalStorage);
    setNumberOfStoredEvents(eventsFromLocalStorage.length);
  }, []);

  return (
    <div >
      <div>
        <h1 className="dashboard-header">Welcome to the Dashboard</h1>
      </div>
      <div className="stats">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <h2>{stat.title}</h2>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="dashboard-header">Scheduled Events</h2>
        <div className="event-grid">
          {storedEvents.map((event, index) => (
            <div key={index} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                {event.start} - {event.end}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <h2>You scheduled: {numberOfStoredEvents} events</h2>
      </div>
    </div>
  );
};

export default Dashboard;
