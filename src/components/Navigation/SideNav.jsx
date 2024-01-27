import React from 'react';
import "./sidenav.css";

const SideNav = () => {
  const navItems =  [
    {
      navItem: "Dashboard",
      id: 1,
      url: "/"
    },
    {
      navItem: "Calendar",
      id: 2, // Updated ID for Calendar
      url: "/calendar"
    },
    {
      navItem: "Events",
      id: 3, // Updated ID for Events
      url: "/events"
    }
  ];

  return (
    <div>
      <div className='sidenav'>
        <ul className='navItems'>
          {navItems.map((item) => (
            <li key={item.id} className={window.location.pathname === item.url ? 'active' : ''}>
              <a href={item.url}>{item.navItem}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
