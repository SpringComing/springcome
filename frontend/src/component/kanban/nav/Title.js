import React from "react";

const Title = ({project}) => {
  return (
    <div className="kanban__nav-name">
        <div className="kanban-name">{ `${project.name} (${project.startDate} ~ ${project.endDate})` }</div>
    </div>
  );
};

export default Title;