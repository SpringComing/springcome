import React from 'react';
import ProjectCard from "./ProjectCard.js";

const ProjectMain = ({ projects, openModal, projectNo,setProjectNo }) => {
    return (
        <section className="kanban__main">
            <div className="kanban__main-wrapper">
                { 
                    projects.map( project =>  <ProjectCard key={ project.no } project={ project } openModal = { openModal } /> ) 
                    
                }
            </div>
        </section>
 
    );
};

export default ProjectMain;



