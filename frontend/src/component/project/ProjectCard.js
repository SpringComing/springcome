import React, { Fragment } from 'react';
import Description from './Description';
import styles from '../../assets/css/component/project/ProjectCard.scss'
const SERVER_URL = "http://localhost:8080";

const ProjectSetting = (project, openModal) => {
    return(
        <Fragment>
            <div className="backlog-dots" 
                 onClick={ () => openModal(project.no, 'people') }>
                    <i className="material-icons">people</i>
            </div>
            <div className="backlog-dots" >
                <i className="material-icons"></i>
            </div>
            <div className="backlog-dots" 
                 onClick={ () => openModal(project.no, 'update') }>
                    <i className="material-icons">settings</i>
            </div>
        </Fragment>
    );
};


/**
* 함수: intoBoard
* 작성자: 성창현
* 기능: 칸반 보드로 화면 전환
*/
const intoBoard =  (project) => {
    if(project == null) {
        console.log("프로젝트번호 없음");
        return
    }
    console.log("프로젝트번호 : ", project.no);
    
    //location.href = `/board/${project.no}`;
    location.href = `/board/${project.no}`;

}


const ProjectCard = ({ project, openModal }) => {
    return (
        <div className="backlog-color card-wrapper">
            <div className="card-wrapper__header">
                <div className={ styles.backlog_name }>{ project.name }</div>
                <div className="backlog-dots" >

                    {
                        project.role === 'ADMIN' ? 
                            ProjectSetting(project,openModal)
                            :
                            null
                    }

                </div>
            </div>
            <div className="cards"
                 onClick={() => intoBoard(project)}>  
                <Description desc={ project.description }
                             startDate={ project.startDate }
                             endDate={ project.endDate } />
            </div>
        </div>
    );
};

export default ProjectCard;