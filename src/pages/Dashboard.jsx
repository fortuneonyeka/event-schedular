import React from 'react';
import './dashboard.css';

const Dashboard = () => {
  const statsData = [
    { title: 'Total Users', value: '1000' },
    { title: 'Total Events', value: '500' },
    { title: 'Total Revenue', value: '$5000' }
  ];


  const recentActivityData = [
    'User John Doe registered.',
    'Order #123 shipped.',
    'User Jane Smith logged in.',
    'New product added.'
  ];

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <div className="stats">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <h2>{stat.title}</h2>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          {recentActivityData.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
