import React from "react";
import Projects from "./Projects.js";
import Schedule from "./Schedule.js";
import Settings from "./Settings.js";

const Sidebar = () => {
    return (
      <section className="kanban__sidebar">
        <div className="kanban__sidebar-menu">
          <Projects />
          <Schedule />
          <Settings />
        </div>
      </section>
    );
}

export default Sidebar;
