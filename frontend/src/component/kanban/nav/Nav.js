import React from "react";
import Title from "./Title.js";
import AddProcess from "./AddProcessButton"

const Nav = ({addProcess, project}) => {
  return (
    <section className="kanban__nav">
        <div className="kanban__nav-wrapper">
          <Title project={project} />
          <AddProcess addProcess={addProcess} />
        </div>
      </section>
  );
};

export default Nav;