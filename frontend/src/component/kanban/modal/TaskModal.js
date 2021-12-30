import React, {Fragment, useRef, useState} from 'react';
import Modal from "react-modal";
import update from 'react-addons-update';
import stylesTask from "../../../assets/css/component/kanban/AddTask.scss"
import SettingModalStyle from "../../../assets/css/component/kanban/TaskSettingModal.scss"
import CommentModalStyle from "../../../assets/css/component/kanban/TaskCommentModal.scss"
import ModalStyle from "../../../assets/css/component/project/CommentModal.scss"
import  Cookie  from "react-cookies"
import base64 from 'base-64'
import { saveAs} from 'file-saver'
const SERVER_URL = "http://localhost:8080";
Modal.setAppElement('body');

const TaskModal = ({projectNo, modalIsOpen, setModalIsOpen, processes, setProcesses, pindex, tindex}) => {

    const task = processes[pindex].tasks[tindex];
    const refForm = useRef(null);                             
    const currentDate = new Date().toISOString().substring(0, 10); //현재 날짜 가져오기
    const [name, setName] = useState(task.name);
    const [importance, setImportance] = useState(task.importance);
    const [startDate, setStartDate] = useState(task.startDate ? task.startDate : currentDate);
    const [endDate, setEndDate] = useState(task.endDate ? task.endDate : currentDate);
    const [num, setNum] = useState(1);
    const [taskUsers, setTaskUsers] = useState([]);
    const [taskNoneUsers, setTaskNoneUsers] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [commentText, setComment] = useState([]);
    const [flag, setFlag] = useState(true);

    const menu = (num) => {
        if(num == 1) {
            return(setting());
        } else if(num == 2) {
            return(comment());
        } else {
            return(file());
        }
    }

    const modalClose = () => {
        setModalIsOpen(false);
        setName(task.name);
        setImportance(task.importance);
        setStartDate(task.startDate ? task.startDate : currentDate);
        setEndDate(task.endDate ? task.endDate : currentDate);
        setNum(1);
        setComment('');
        setFlag(true);
    }
        
    // const modalInit = () => {
    //     setName(task.name);
    //     setImportance(task.importance);
    //     setStartDate(task.startDate ? task.startDate : currentDate);
    //     setEndDate(task.endDate ? task.endDate : currentDate);
    //     setComment('');
    //     setNum(1);
        
    // }

    const callTaskUser = async() => {
        try {
            const response = await fetch(`/api/task/taskUser/${task.no}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',   // cf. application/x-www-form-urlencoded
                'Accept': 'application/json'          // cf. text/html
              },        
              body: null
            });
            if(!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
            }
            const jsonResult = await response.json();
            if(jsonResult.result !== 'success') {
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
            setTaskUsers(jsonResult.data);
          } catch (err) {
            console.error(err);
          }
    }
    const callTaskNoneUser = async() => {
        try {
            const response = await fetch(`/api/task/taskNoneUser?projectNo=${projectNo}&taskNo=${task.no}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',   // cf. application/x-www-form-urlencoded
                'Accept': 'application/json'          // cf. text/html
              },        
              body: null
            });
            if(!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
            }
            const jsonResult = await response.json();
            if(jsonResult.result !== 'success') {
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
            setTaskNoneUsers(jsonResult.data);
          } catch (err) {
            console.error(err);
          }
    }
    const fileLoad = async(taskNo) => {
        try {
            const response = await fetch(`/api/task/file/${taskNo}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });
            if (!response.ok) {
                throw `${response.status} ${response.statusText}`;
            }
            const json = await response.json();
            // update가 안 된 경우
            if(!json.data) {
                return;
            }
            setFileList(json.data);
        } catch (err) {
            console.error(err);
        }
    }

    const getComment = async(task) => { 
 
        try {
            const response = await fetch(`/api/task/comment`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    no: task.no,

                })
            });
    
            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }
    
            const json = await response.json();
    
            if(!json.data) {
                return;
            }

            
            var comments = []
            for(var i = 0; i<json.data.length; i++){
                comments.push(json.data[i]);
            }
            console.log(json.data)
            setComment(comments)
    
          } catch (err) {
            console.error(err);
          }
        }

    const addComment = async(task,message) => { 

            try {
                const response = await fetch(`/api/task/addComment`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        no: task.no,
                        message: message,
    
                    })
                });
        
                if(!response.ok) {
                    throw  `${response.status} ${response.statusText}`;
                }
        
                const json = await response.json();
        
                if(!json.data) {
                    return;
                }
                
                setComment([...commentText, {no:json.data.no, name:json.data.name, message:json.data.message, reg_date:json.data.reg_date, user_no:json.data.user_no }])
                document.getElementById("back").scrollTop = document.getElementById("back").scrollHeight
                
              } catch (err) {
                console.error(err);
              }
            }

        // if(modalIsOpen && flag) {
        //     setFlag(false)
        //     getComment(task);
        // }

        if(modalIsOpen && flag) {
            callTaskUser();
            callTaskNoneUser();
            fileLoad(task.no);
            getComment(task);
            setFlag(false);
        }

   
        const handleSettingSubmit = async(taskName, taskImportance, taskStartDate, taskEndDate) => {
            if(taskName.trim() == '') return;
            else taskName = taskName.trim();
            try {
                const response = await fetch(`/api/task/attr`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        no: task.no,
                        name: taskName,
                        importance: taskImportance,
                        startDate: taskStartDate,
                        endDate: taskEndDate
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
                  [pindex]: {
                    tasks: {
                        [tindex]: {
                            name: {$set: taskName},
                            importance: {$set: taskImportance},
                            startDate: {$set: taskStartDate},
                            endDate: {$set: taskEndDate}
                        }
                    }
                  }
                }));
                setModalIsOpen(false);
                modalClose();
              } catch (err) {
                console.error(err);
              }
        }

        const delTaskUser = async(userNo, index) => {
            try {
                const response = await fetch(`/api/task/assign?userNo=${userNo}&taskNo=${task.no}`, {
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
                let updateTaskUsers = taskUsers;
                let [popTaskUser] = updateTaskUsers.splice(index, 1);
                setTaskUsers(updateTaskUsers);
                setTaskNoneUsers([popTaskUser, ...taskNoneUsers]);
            } catch (err) {
                console.error(err);
            }
        }
        const plusTaskUser = async(userNo, index) => {
            try {
                const response = await fetch(`/api/task/assign?userNo=${userNo}&taskNo=${task.no}`, {
                    method: 'post',
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
                let updateTaskNoneUsers = taskNoneUsers;
                let [popTaskNoneUser] = updateTaskNoneUsers.splice(index, 1);
                setTaskNoneUsers(updateTaskNoneUsers);
                setTaskUsers([popTaskNoneUser, ...taskUsers]);
            } catch (err) {
                console.error(err);
            }
        }
        const delTask  = async(taskNo) => {
            try {
                const response = await fetch(`/api/task/${taskNo}`, {
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
                    modalClose();
                    return;
                }
                modalClose();
                let updateTasks = processes[pindex].tasks;
                updateTasks.splice(tindex, 1);
                setProcesses(update(processes, {
                    [pindex]: {
                        tasks: {
                            $set: updateTasks
                        }
                    }
                }));
            } catch (err) {
                console.error(err);
            }
        }  
        const notifyFile = {
            add: async function(taskNo, file) {
                try {
                    // Create FormData
                    const formData = new FormData();
                    formData.append('file', file);
                    // Post
                    const response = await fetch(`/api/task/file?userNo=${Cookie.load('userno')}&taskNo=${taskNo}`, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json' },
                        body: formData
                    })
                    // fetch success?
                    if (!response.ok) {
                        throw `${response.status} ${response.statusText}`;
                    }
                    // API success?
                    const json = await response.json();
                    if(!json.data) {
                        return;
                    }
                    // re-rendering(update)
                    setFileList([json.data, ...fileList]);
                } catch (err) {
                    console.error(err);
                }
            },
            delete: async function(fileNo) {
                try {
                    // Delete
                    const response = await fetch(`/api/task/file/${fileNo}`, {
                        method: 'delete',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json' },
                        body: null
                    });
                    // fetch success?
                    if (!response.ok) {
                        throw `${response.status} ${response.statusText}`;
                    }
                    // API success?
                    const json = await response.json();
                    if (json.result !== 'success') {
                        throw json.message;
                    }
                    setFileList(fileList.filter(file => file.no !== fileNo));
                } catch (err) {
                    console.error(err);
                }
            }
        }    


        const setting = () => {
            return(
            <Fragment>
            <form
                className={ SettingModalStyle.task_reg }
                ref={ refForm }
                onSubmit={() => handleSettingSubmit(name, importance, startDate, endDate) } >
                    <div className={ SettingModalStyle.modal_input } >    
                        <span>업무명</span>
                        <input type='text'  
                            name="taskName"
                            placeholder={ task.name }
                            defaultValue={ task.name }
                            onChange={ (e) => setName(e.target.value) } />
                    </div>
                    <div className={ SettingModalStyle.modal_input2 } >
                        <span>중요도</span>
                    </div>
                    <div className={SettingModalStyle.startRadio}>
                        <label className={SettingModalStyle.startRadio__box}>
                            <input type="radio" name="star" id="" defaultChecked={task.importance === 1} onClick={() => setImportance(1)}/>
                            <span className={SettingModalStyle.startRadio__img}>
                                <span className={SettingModalStyle.blind}>1</span>
                            </span>
                        </label>
                        <label className={SettingModalStyle.startRadio__box}>
                            <input type="radio" name="star" id="" defaultChecked={task.importance === 2} onClick={() => setImportance(2)}/>
                            <span className={SettingModalStyle.startRadio__img}>
                                <span className={SettingModalStyle.blind}>2</span>
                            </span>
                        </label>
                        <label className={SettingModalStyle.startRadio__box}>
                            <input type="radio" name="star" id="" defaultChecked={task.importance === 3} onClick={() => setImportance(3)} />
                            <span className={SettingModalStyle.startRadio__img}>
                                <span className={SettingModalStyle.blind}>3</span>
                            </span>
                        </label>
                    </div>
                    <div className={ SettingModalStyle.text2 }>
                    <span>기간</span>
                    </div>
                    <div className={ SettingModalStyle.modal_input } >
                        <span >시작</span>
                        <input type="date" name="taskStartDate" defaultValue={task.startDate} onChange={ (e) => setStartDate(e.target.value) }/>
                        <span >끝</span>
                        <input type="date" name="taskEndtDate" defaultValue={task.endDate} onChange={ (e) => setEndDate(e.target.value) }/>
                    </div>
                    <div className={ SettingModalStyle.text }>
                    <span>업무 참여 인원</span>
                    </div>
                    <div className={ SettingModalStyle.team_wrapper } >
                            <div className={ SettingModalStyle.team }>
                                {
                                    taskUsers.map((user, index) =>
                                                        <div key={index} >
                                                            <span className={ SettingModalStyle.team_profile }>
                                                                <i className="material-icons">account_circle</i>
                                                            </span>
                                                            <span className={ SettingModalStyle.team_name }>
                                                                { user.name }
                                                            </span>
                                                            <span className={ SettingModalStyle.team_email }>
                                                                { user.email }
                                                            </span>
                                                            <span className={ SettingModalStyle.team_exclude }>
                                                                <i className="material-icons"
                                                                    onClick={ () => delTaskUser(user.no, index) } >clear</i>
                                                            </span>
                                                        </div> )
                                }
                            </div>
                        </div>
                        <div className={ SettingModalStyle.text }>
                        <span>프로젝트 인원</span>
                        </div>
                        <div className={ SettingModalStyle.team_wrapper } >
                            <div className={ SettingModalStyle.team }>
                                {
                                    taskNoneUsers.map((user, index) =>
                                                            <div key={index} >
                                                                <span className={ SettingModalStyle.team_profile }>
                                                                    <i className="material-icons">account_circle</i>
                                                                </span>
                                                                <span className={ SettingModalStyle.team_name }>
                                                                    { user.name }
                                                                </span>
                                                                <span className={ SettingModalStyle.team_email }>
                                                                    { user.email }
                                                                </span>
                                                                <span className={ SettingModalStyle.team_exclude }>
                                                                    <i className="material-icons"
                                                                        onClick={ () => plusTaskUser(user.no, index) } >add_box</i>
                                                                </span>
                                                            </div> )
                                }
                        </div>
                    </div>          
            </form>
            <div className={ SettingModalStyle.modal_btn }>
                <button type="submit"
                      form="task_reg"
                      onClick={ () => {refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}))} }>
                <span>변경</span>
                </button>
                <button form="task_reg"
                      onClick={ () => delTask(task.no) }>
                    <span>삭제</span>
                </button>
            </div>
            </Fragment>);
        }
        const handleSubmit = () => {}
    const comment = () => {
        
        return(
            <Fragment>
                <form 
                className={ CommentModalStyle.task_reg }
                ref={ refForm }
                onSubmit={ handleSubmit }>

                <div className={ CommentModalStyle.text }>
                <span>COMMENT</span>
                </div>
                <div className={ ModalStyle.team_wrapper }>
                                    <div className={ ModalStyle.team } style={{display:"inline-block"}} id="back">         
                                        {
                                            commentText.map(comment => 
                                                
                                             
                                             <div key={comment.no} style={{display: "inline"}}>
                                                    
                                                    {comment.user_no != Cookie.load('userno') ?
                                                     <div>
                                                                  
                                                                    <span className={ ModalStyle.team_profile }>
                                                                        <i className="material-icons">account_circle</i>
                                                                    </span>
                                                                    <span className={ ModalStyle.team_name } style={{ width:"110px",marginTop:"3px", textAlign:"left", fontWeight:"bold"}}>
                                                                        {comment.name}
                                                                    </span>
                                                                    <p  style={{width: "500px", height: "50px", textAlign:"left", display: "inline-block", overflowY:"auto"}}>
                                                                        {comment.message}
                                                                    </p>
                                                                    <span style={{fontSize:"8px", width:"100px", marginTop:"40px"}}>
                                                                        {comment.reg_date}
                                                                    </span>
                                                    </div>  
    : 
                                                     <div>               
                                                                    
                                                                    
                                                                    <span style={{fontSize:"8px", width:"100px", marginTop:"40px"}}>
                                                                        {comment.reg_date}
                                                                    </span>
                                                                    <p  style={{marginTop:"8px",width: "500px", height: "50px", textAlign:"right", display: "inline-block", overflowY:"auto"}}>
                                                                        {comment.message}
                                                                    </p>
                                                                    <span className={ ModalStyle.team_name } style={{ width:"110px",marginTop:"3px", textAlign:"right", fontWeight:"bold", color:"blue"}}>
                                                                        {comment.name}
                                                                    </span>
                                                                    <span className={ ModalStyle.team_profile }>
                                                                        <i className="material-icons" style={{color:"blue"}}>account_circle</i>
                                                                    </span>
                                                                    
                                                    </div> }
    
                                            </div>
                                            
                                            )                  
                                        }      
                                    </div>
                                    
                                   
                                </div>
                                
                                
                <div className={ CommentModalStyle.modal_input } >
                    <input type='text' 
                           placeholder='comment 를 남겨주세요.' id='input'/>

                </div>

                <div className={ CommentModalStyle.modal_btn }>
                    <button type="submit" 
                            form="task_reg"
                            onClick={ () => {
                                var input = document.getElementById('input').value;   
                                addComment(task,input)
                                document.getElementById('input').value = ""
       
                            }}>
                        <span className={ stylesTask.add_icon }><i className="material-icons">send</i></span>
                    </button>
                </div>
            </form>
                            
            
            </Fragment>)
            
            
            
   
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();
        // Validation
        if (e.target['uploadImage'].files.length === 0) {
            console.error(`validation ${e.target['uploadImage'].placeholder} is empty`);
            return;
        }
        const fileData = e.target['uploadImage'].files[0];
        notifyFile.add(task.no, fileData);
        //modalClose();
    }
    const callFileDownload = async (file) => {
        try {
            const response = await fetch(`/api/task/fileData/${file.no}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });
            if (!response.ok) {
                alert("response error");
                throw `${response.status} ${response.statusText}`;
            }
            const json = await response.json();

            console.log("파일 json.data : ",json.data);

            // get이 안 된 경우
            if(!json.data) {
                alert("json.data error");
                return;
            }
            let binary = base64.decode(json.data);
            let blob = new Blob([new String(binary)], {type: "text/plain;charset=utf-8"});

            saveAs(blob, file.name);
        } catch (err) {
            console.error(err);
        }
      }
    const file = () => {
        return(
            <Fragment>
                <form
                className={ SettingModalStyle.task_reg }
                ref={ refForm }
                onSubmit={ handleFileSubmit } >
                <div className={ SettingModalStyle.modal_input3 } >
                    <span>파일첨부</span>
                    <input type={'file'}
                        name={'uploadImage'}/>
                </div>
                <div className={ SettingModalStyle.text }>
                    <span>파일 목록</span>
                </div>
                <div className={ SettingModalStyle.team_wrapper } >
                        <div className={ SettingModalStyle.team }>
                            {
                                fileList.map((item, index) =>
                                                    <div key={index} >
                                                        <span className={ SettingModalStyle.team_exclude }>
                                                            <i className="material-icons"
                                                                onClick={ () => notifyFile.delete(item.no) } >clear</i>
                                                        </span>
                                                        <span className={ SettingModalStyle.team_name }>
                                                            { item.userName }
                                                        </span>
                                                        <span className={ SettingModalStyle.file_name }>
                                                            { item.name }
                                                        </span>
                                                        <span className={ SettingModalStyle.team_exclude }>
                                                            <i className="material-icons"
                                                                onClick={ () => callFileDownload(item) } >file_download</i>
                                                        </span>
                                                    </div> )
                            }
                        </div>
                </div>
            </form>
            <div className={ SettingModalStyle.modal_btn }>
              <button type="submit"
                      form="task_reg"
                      onClick={ () => {refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}))} }>
                <span>파일업로드</span>
              </button>
            </div>
            </Fragment>);
    }

    return (
        
        <Modal
            isOpen={ modalIsOpen }
            onRequestClose={ () => modalClose() }          //오버레이 부분을 클릭하거나 또는 Esc 키를 누를 시 모달 창이 닫히게 한다
            shouldCloseOnOverlayClick={ false }            //오버레이 클릭은 막고 Esc 키만으로 모달창을 닫게 한다
            contentLabel="Project Setting"                 //웹접근성 ex) 시작장애인이 사용시 정보 전달에 사용
            className={ SettingModalStyle.Modal }
            overlayClassName={ SettingModalStyle.Overlay }>
            
            <div className={ SettingModalStyle.modal_header } >
                <h2>업무</h2>
                <span onClick={ () => { setModalIsOpen(false); modalInit(); } }>
                    <i className="material-icons">clear</i>
                </span>
            </div>
            <div className={SettingModalStyle.navi} id='menu'>
                <button style={ num == 1 ? {backgroundColor: '#bcdd28'} : {backgroundColor: '#2bb632'}} onClick={() => setNum(1)}>설정</button>
                <button style={ num == 2 ? {backgroundColor: '#bcdd28'} : {backgroundColor: '#2bb632'}} onClick={() => setNum(2)}>코멘트</button>
                <button style={ num == 3 ? {backgroundColor: '#bcdd28'} : {backgroundColor: '#2bb632'}} onClick={() => setNum(3)}>파일</button>
            </div>
            
            {menu(num)}

        </Modal>
        
    );  

}





export default TaskModal;