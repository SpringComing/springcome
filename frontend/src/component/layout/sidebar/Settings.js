import React from "react";
import { NavLink } from "react-router-dom";

const Settings = () => {
 
    return (
      <NavLink to={"/profile"} >
        <div className="kanban__sidebar-settings">
          <i className="material-icons">settings</i>
          <span>Settings</span>
        </div>
      </NavLink>
    );
  
};


export default Settings;

