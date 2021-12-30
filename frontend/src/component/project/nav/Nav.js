import React from "react";
import Title from "./Title.js";
import AddProject from "./AddProject"

const Nav = ({setModalIsOpen}) => {
  return (
    <section className="kanban__nav">
        <div className="kanban__nav-wrapper">
          <Title />
          <AddProject setModalIsOpen={ setModalIsOpen } />
        </div>
      </section>
  );
};

export default Nav;