import React from 'react';
import styles from './Kanban.scss';
import update from 'react-addons-update';
const SERVER_URL = "http://localhost:8080";

const Checklist = ({processes, setProcesses, modalData, setModalData, pindex, tindex, cindex}) => {
    const checklist = processes[pindex].tasks[tindex].checklists[cindex];

    const changeChecklistStatus = async (changeChecklist) => {
        try {
            const response = await fetch(`/api/checklist/${changeChecklist.no}`, {
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
                    label: '체크리스 상태가 변경되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }
    
            // update가 된 경우
            
            setProcesses(update(processes, {
                [pindex]: {
                    tasks: {
                        [tindex]: {
                            checklists: {
                                [cindex]: {
                                    status: {
                                        $set: !changeChecklist.status
                                    }}}}}}}));
    
        } catch (err) {
            console.error(err);
        }
    }
    
    const deleteChecklist = async (changeChecklist) => {        
        try {
            const response = await fetch(`/api/checklist/${changeChecklist.no}`, {
                method: 'get',
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
    
            // delete가 안 된 경우
            if(!json.data) {
                setModalData(Object.assign({}, modalData, {
                    label: '체크리스트가 삭제되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }
    
            // delete가 된 경우
            setProcesses(update(processes, {
                [pindex]: {
                    tasks: {
                        [tindex]: {
                            checklists: {
                                $set: processes[pindex].tasks[tindex].checklists.filter(checklist => checklist.no !== changeChecklist.no)
                            }}}}}));
                        
                
    
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <li className={styles.Check}>
            <input type='checkbox' checked={checklist.status} onChange={ () => changeChecklistStatus(checklist)}/> 
            {' '+checklist.name+' '}
            <a onClick={ () => deleteChecklist(checklist) } className={styles.Check__remove}></a>
        </li> 
    );
}

export default Checklist;


