import React from "react";
import { NavLink } from "react-router-dom";

class Schedule extends React.Component {
  render() {
    return (
      <NavLink to={"/schedule"}  >
        <div className="schedule-area">
          <i className="material-icons">event_note</i>
          <span>Schedule</span>
        </div>
      </NavLink>
    );
  }
}

export default Schedule;
