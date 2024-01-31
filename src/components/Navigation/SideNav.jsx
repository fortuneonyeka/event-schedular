import React, { useState } from "react";
import "./sidenav.css";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { text: "Dashboard", link: "/", id: 1 },
    { text: "Events", link: "/events", id: 2 },
    { text: "Calendar", link: "/calendar", id: 3 },
  ];

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="nav-header">
        <Link to="/">
          <h3 className="app-header">My App</h3>
        </Link>
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleNav}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>

      <ul className={`nav-items ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li
            key={item.id}
            className={location.pathname === item.link ? "active" : ""}
          >
            <Link to={item.link} onClick={toggleNav}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
