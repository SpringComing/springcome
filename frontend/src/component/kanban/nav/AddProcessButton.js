import React from 'react';
import styles from "../../../assets/css/component/kanban/AddProcess.scss"

const AddProcessButton = ({addProcess}) => {
    return (
        <div className={ styles.add_process }>
            <button onClick={ () => addProcess() } >
                <span className={ styles.add_icon }><i className="material-icons">add_circle</i></span>
                프로세스 추가
            </button>
        </div>
    );
};

export default AddProcessButton;