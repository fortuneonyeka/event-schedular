import React from 'react';
import './modal.css';

const Modal = ({ saveEvent, eventTitle, setEventTitle, setShowModal }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Add Event</h2>
        <form>
          <div className="form-group">
            <label htmlFor="eventTitle">Event Title:</label>
            <input
              type="text"
              id="eventTitle"
              value={eventTitle}
              onChange={setEventTitle}
              required
            />
          </div>
          <div className="form-group">
            <button onClick={saveEvent} type="button" className="submit-btn">
              Submit
            </button>
            <button onClick={setShowModal} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
