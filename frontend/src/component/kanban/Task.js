import React, {Fragment, useState} from 'react';
import update from 'react-addons-update';
import Checklist from './Checklist';
import TaskModal from "./modal/TaskModal";
import styles from './Kanban.scss';
const SERVER_URL = "http://localhost:8080";
const Task = ({projectNo, processes, setProcesses, modalData, setModalData, pindex, tindex}) => {
    const task = processes[pindex].tasks[tindex];
    const [text, setText] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);           //프로젝트 추가 모달 생성 상태

    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
          if(text.trim() === '') return;
          else {
            insertChecklist(text.trim());
            setText('');
          }
        }
    }

    const changeTaskStatus = async () => {

        try {
            const response = await fetch(`/api/task/${task.no}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }

            const json = await response.json();

            // update가 안 된 경우
            if(!json.data) {
                setModalData(Object.assign({}, modalData, {
                    label: '진행상황이 변경되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }

            // update가 된 경우
            setProcesses(update(processes, {
                [pindex]: {
                    tasks: {
                        [tindex]: {
                            status: {
                                $set: !task.status
                            }}}}}));
                            
        } catch (err) {
            console.error(err);
        }
    }

    const insertChecklist = async (name) => {
        try {
            const response = await fetch(`/api/checklist`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    taskNo: task.no
                })
            });

            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }

            const json = await response.json();

            // insert가 안 된 경우
            if(!json.data) {
                setModalData(Object.assign({}, modalData, {
                    label: '체크리스트가 추가되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }

            // insert가 된 경우
             setProcesses(update(processes, {
                [pindex]: {
                    tasks: {
                        [tindex]: {
                            checklists: {
                                $set: [...task.checklists, json.data]
                            }}}}}));                       
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <div className="card__header">
                <div className={task.importance == 1 ? styles["card-container-color"]+' '+styles["card-color-low"] : (task.importance == 2 ? styles["card-container-color"]+' '+styles["card-color-med"] : styles["card-container-color"]+' '+styles["card-color-high"])}>
                    <div className="card__header-priority">{task.importance == 1 ? '★' : (task.importance == 2 ? '★★' : '★★★' )}</div>
                </div>
                <div className={styles.card__header_clear} onClick={ () => setModalIsOpen(true) }>
                    <i className="material-icons">more_vert</i>
                </div>
            </div>
            <div className={styles.card__title}>
                <div className={styles.card__text}>{task.name}</div>    
            </div>
            <div className={styles.card__date}>
                {task.startDate||task.endDate ? 
                    (task.startDate ? task.startDate : '') + ' ~ ' + (task.endDate ? task.endDate : '')
                     : ''}
            </div>
            <ul>
                {task.checklists.map((checklist, index) => {
                                    return(<Checklist
                                                    key={checklist.no}
                                                    processes={processes}
                                                    setProcesses={setProcesses}
                                                    modalData={modalData}
                                                    setModalData={setModalData}
                                                    pindex={pindex}
                                                    tindex={tindex}
                                                    cindex={index}
                                                />);}
                )}
            </ul>
            <div>
                <input type='text'
                        value={text} 
                        className={styles.CheckList__add_check} 
                        placeholder='체크리스트 추가'
                        onChange={ (e) => setText(e.target.value)} 
                        onKeyPress={onCheckEnter}/>
            </div>
            <div className="card__menu">
                <div className="card__menu-left">
                    <div className="comments-wrapper">
                        <div className="comments-ico">
                            <i className="material-icons"></i>
                        </div>
                        <div className="comments-num"></div>
                    </div>

                    <div className="attach-wrapper">
                        <div className="attach-ico">
                            <i className="material-icons"></i>
                        </div>
                        <div className="attach-num"></div>
                    </div>
                </div>

                <div className={styles.card__menu_right}>
                    <div className={styles.img_avatar2} onClick={ () => changeTaskStatus() }>
                        {task.status ? <img src='/assets/images/green.jpg'/>
                         : <img src='/assets/images/red.jpg'/>}
                    </div>
                </div>
            </div>
            <TaskModal 
                        key={task.no}
                        projectNo={projectNo}
                        modalIsOpen={ modalIsOpen } 
                        setModalIsOpen={ setModalIsOpen }
                        processes={processes}
                        setProcesses={setProcesses}
                        pindex={pindex}
                        tindex={tindex} />
        </Fragment>
    );

};

export default Task;
