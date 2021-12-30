import React, {Fragment, useState} from 'react';
import Modal from 'react-modal';
import Task from './Task';
import { Droppable, Draggable } from "react-beautiful-dnd";
import update from 'react-addons-update';
import stylesTask from "../../assets/css/component/kanban/AddTask.scss"
import styles from './Kanban.scss'
import modalStyles from "../../assets/css/component/kanban/modal.scss";
const SERVER_URL = "http://localhost:8080";
const Process = ({projectNo, processes, setProcesses, pindex, reUploadProcesses}) => {
    const process = processes[pindex];
    const [text, setText] = useState(process.name);
    const [clickName, setClickName] = useState(false);
    const [modalData, setModalData] = useState({isOpen: false});

    const delProcess = async(processNo, pindex) => {
        try {
            const response = await fetch(`/api/process/${processNo}`, {
                method: 'delete',
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
    
            if(!json.data) {
                return;
            }
    
            reUploadProcesses();
    
        } catch (err) {
            console.error(err);
        }
    }

    const addTask = async() => {
        //console.log("process.no : ", process.no);
        try {
            const response = await fetch(`/api/task/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: '새 업무',
                    importance: 1,
                    status: 0,
                    color: 'black',
                    processNo: process.no
                })
            });

            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }

            const json = await response.json();

            // insert가 안 된 경우
            if(!json.data) {
                setModalData(Object.assign({}, modalData, {
                    label: '업무가 추가되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }

            // insert가 된 경우
            setProcesses(update(processes, {
                [pindex]: {
                    tasks: {
                        $set: json.data
                    }}}));

        } catch (err) {
            console.error(err);
        }
    }

    const changeProcessName = () => {
        setClickName(true);
        setTimeout(()=>{
            document.getElementById("processName").focus();
        }, 50);
        
    }

    const showName = () => {

        if(!clickName) { return process.name; }
        else { 
            return (
                <input
                    id="processName"
                    type='text'
                    value={text}
                    className={styles.process__add} 
                    placeholder={process.name}
                    onChange={ (e) => setText(e.target.value)} 
                    onKeyPress={onCheckEnter}
                    onBlur = {(e) => {setClickName(false)} }
                />
            );
        }
    }

    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
          if(text.trim() === '') return;
          else {
            changeProcess(text.trim());
            setText(process.name);
            setClickName(false);
          }
        }
    }

    const changeProcess = async (processName) => {
        try {
            const response = await fetch(`/api/process`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    no: process.no,
                    name: processName
                })
            });
    
            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }
    
            const json = await response.json();
    
            // update가 안 된 경우
            if(!json.data) {
                return;
            }
    
            // update가 된 경우
            setProcesses(update(processes, {
                    [pindex]:{
                        name: {
                            $set: processName
                        }}}));
    
            setText(processName);
    
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={styles["backlog-color"]+' '+styles["card-wrapper"]}>
            <div className="card-wrapper__header">
                <div className="backlog-name" onDoubleClick={() => changeProcessName() }>
                    {showName()}
                </div>
                <div className={styles.backlog_dots}>
                    <i className="material-icons"
                    onClick={ () => delProcess(process.no, pindex) }>clear</i>
                </div>                    
            </div>

            <Droppable droppableId={`${pindex}`} key={process.no}>
                {(provided) => (
                    <div className="cards" {...provided.droppableProps} ref={provided.innerRef}>
                        { process.tasks.map((task, index) => {
                            return (
                                <Draggable draggableId={`${task.no}`} key={task.no} index={index}> 
                                {(provided) => ( 
                                    <div className="card"
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps} 
                                    >
                                        <Task
                                                key={task.no}
                                                projectNo={projectNo}
                                                processes={processes}
                                                setProcesses={setProcesses}
                                                modalData={modalData}
                                                setModalData={setModalData}
                                                pindex={pindex}
                                                tindex={index}
                                        />
                                    </div> 
                                )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
                </Droppable>


            <div className={ stylesTask.add_task }>
                <button onClick={ () => addTask()}>
                    <span className={ stylesTask.add_icon }><i className="material-icons">add_circle_outline</i></span>
                    업무 추가
                </button>
            </div>

            <Modal
                isOpen={modalData.isOpen}
                ariaHideApp={false}
                onRequestClose={ () => setModalData({isOpen: false}) }
                shouldCloseOnOverlayClick={true}
                className={modalStyles.Modal}
                overlayClassName={modalStyles.Overlay}
                style={{content: {width: 350}}}>
                <div>
                    <form className={styles.DeleteForm}>
                        <label>{modalData.label || ''}</label>
                    </form>
                </div>
                <div className={modalStyles['modal-dialog-buttons']}>
                    <button onClick={() => {setModalData(Object.assign({}, modalData, {isOpen: false})) } }>확인</button>
                </div>
            </Modal>

        </div>
    )
}

export default Process;