import React,{Fragment,useState} from "react";
import style from "../../../assets/css/layout/Notification.scss"
import Modal from "react-modal";

Modal.setAppElement('body');

const Notification = ({alarmList, updateAlarm, deleteAlarm,updateAllAlarm,deleteReadAlarm,deleteAllAlarm}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const findStatus = (alarmList) => {
    
    const result = alarmList && alarmList.find( alarm => alarm.status == 0 );
    
    if(result){
      return (<div className={ style.notification_icon__alert } />);
    }

    return null;
  }

  return (
    <Fragment>
      <div className={style.notification_icon}
          onClick={() => setModalIsOpen(true)}>
          <i className="material-icons">notifications_none</i>
          {
            findStatus(alarmList) 
          }
          
      </div>
      <Modal
          isOpen={ modalIsOpen }
          onRequestClose={ () => setModalIsOpen(false) }          
          shouldCloseOnOverlayClick={ true }                      
          contentLabel="message"                 
          className={ style.Modal }
          overlayClassName={ style.Overlay }>
          <div className={style.msg_wrraper}>
            <div className={style.msg_setting}>
              <span className={style.read_all}>
                <a onClick={()=>{updateAllAlarm()}}>모두 읽음</a>
              </span>
              <span className={style.delete}>
                <a onClick={()=>{deleteReadAlarm()}}>읽은 알림 삭제</a>
                <em> . </em>
                <a onClick={()=>{deleteAllAlarm()}}> 모두 삭제</a>
              </span>
              
            </div>
            {
              alarmList && alarmList.map( (alarm,index) => <div key={index} 
                                                  className={alarm.status == 0 ? style.msg : style.readed_msg} 
                                                  onClick={() => updateAlarm(alarm.alarmNo)} >
                                                <div className={style.text}>
                                                  {alarm.message}
                                                </div>
                                                <div  className={style.clear}
                                                      onClick={() => deleteAlarm(alarm.alarmNo)}>
                                                  <i className="material-icons">clear</i>
                                                </div>
                                              </div> )
            }
          </div>
          
      </Modal>
   
    </Fragment>
  );
};

export default Notification;
