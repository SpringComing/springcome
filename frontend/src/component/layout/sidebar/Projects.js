import React from "react";
import { NavLink } from "react-router-dom";

const Projects = () => {
  return (
    <NavLink to={"/"} >
        <div className="boards-area">
          <i className="material-icons">dns</i>
          <span>Projects</span>
        </div>
    </NavLink>
  );
};

export default Projects;