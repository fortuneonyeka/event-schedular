import React from "react";
import "./modal.css";

const Modal = ({
  saveEvent,
  eventTitle,
  setEventTitle,
  setShowModal,
  selectEvent,
  deleteEvents,
  handleEdit,
}) => {
  const modalTitle = selectEvent ? "Edit Event" : "Add Event";
  const addButtonText = selectEvent ? "Add Changes" : "Add Event";

  const handleDeleteEvent = () => {
    if (selectEvent) {
      deleteEvents(selectEvent.id);
    }
  };

  return (
    <div data-testid="modal" className="modal-container">
      <div className="modal-content">
        <h2>{modalTitle}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="eventTitle">Event Title:</label>
            <input
              type="text"
              value={eventTitle}
              onChange={setEventTitle}
              required
            />
          </div>
          <div className="form-group">
            {selectEvent && (
              <button
                type="button"
                onClick={handleDeleteEvent}
                className="delete-btn"
              >
                Remove Event
              </button>
            )}
            <button
              onClick={selectEvent ? handleEdit : saveEvent}
              type="button"
              data-testid="btn-add"
              className="submit-btn"
            >
              {addButtonText}
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
