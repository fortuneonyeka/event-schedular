import React, { useState } from 'react';
import './sidenav.css';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Define array of nav items
  const navItems = [
    { text: 'Dashboard', link: '/' , id: 1},
    { text: 'Events', link: '/events' , id: 2},
    { text: 'Calendar', link: '/calendar', id: 3 }
  ];

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="nav-header">
        <h3>My App</h3>
        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleNav}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
      {/* Map over navItems to generate list */}
      <ul className={`nav-items ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.id} className={window.location.pathname === item.link ? 'active' : ''}>
            <a href={item.link} onClick={toggleNav}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
