import React from 'react'
import "./sidenav.css"

const SideNav = () => {
  return (
    <div>
      <div className='sidenav'>
        <ul className='nevItems'>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#calendar">Calendar</a></li>
          <li><a href="#events">Events</a></li>
        </ul>
      </div>
    </div>
  )
}

export default SideNav