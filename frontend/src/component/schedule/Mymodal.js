import React,{useState,useRef} from 'react';
import Modal from "react-modal";
import ModalStyle from "../../assets/css/component/project/CalendarModal.scss"
const SERVER_URL = "http://localhost:8080";


Modal.setAppElement('body');

const Mymodal = ({modalIsOpen, setModalIsOpen, data}) => {

    const refForm = useRef(null);                             
    const currentDate = new Date().toISOString().substring(0, 10); //현재 날짜 가져오기

    /**
   * 함수: modalClose 
   * 작성자: 성창현
   * 기능: 모달 상태 리셋
   */
   const modalClose = () => {
    setModalIsOpen(false)
   }

//    const moveProject = () => {
//      window.location.href(`/`)
//    }


    return (
        
        <Modal
            isOpen={ modalIsOpen }
            className={ ModalStyle.Modal }
            onRequestClose={ () => modalClose() }          //오버레이 부분을 클릭하거나 또는 Esc 키를 누를 시 모달 창이 닫히게 한다
            shouldCloseOnOverlayClick={ false }            //오버레이 클릭은 막고 Esc 키만으로 모달창을 닫게 한다
            contentLabel="Project Setting"                 //웹접근성 ex) 시작장애인이 사용시 정보 전달에 사용
            className={ ModalStyle.Modal }
            overlayClassName={ ModalStyle.Overlay }
            >
            
            <div className={ ModalStyle.modal_header }> 
                <center><h2>프로젝트 정보</h2></center>
                <span onClick={ () => modalClose() }>
                </span>
            </div>
            <hr />
            <form 
                className={ ModalStyle.project_reg }
                ref={ refForm }
               >
                   <br />
                <div className={ ModalStyle.modal_input }>
                    <span className='text'>프로젝트 이름</span>
                    <input type='text'  
                           name="projectName" 
                           placeholder={' ' + data[0]}
                           disabled
                        />
                </div>
                <div className={ ModalStyle.modal_input }>
                  <span className='text' style={{
                      width: "140px",
                      height: "40px"
                  }}>설명</span>
                </div>
                <div className={ ModalStyle.modal_textarea }>
                    <textarea name="projectDesc" 
                              value={ data[3] } 
                              disabled
                               
                              />
                </div>
                <div className={ ModalStyle.modal_input }>
                  <span className='text' style={{
                      height: "40px"
                  }}>기간</span>
                  </div>
                  <div className={ ModalStyle.modal_input } style={{
                      paddingLeft: "10px",
                      marginLeft: "0px"
                  }}>
                  <span>시작</span>
                    <input type="date" style={{marginLeft:0}} name="startDate" value = { data[1] } disabled  /><br/>
                    <span >끝</span>
                    <input type="date" style={{marginLeft:0}} name="endtDate" value = { data[2] }  disabled/>
                    </div>
                
            <br/>
            <div className={ ModalStyle.modal_btn }>
            <button style={{ width:150 ,marginLeft: 20,marginRight:0 }} 
                      form="project_reg"
                      onClick={ (e) => {  

                              window.location.replace("/");


                              } }>
                 이동
              </button>
              <button style={{ width:150 ,marginLeft: 20, marginRight:0 }} 
                      form="project_reg"
                      onClick={ () => {  
                              modalClose(); 
                              } }>
                 확인
              </button>
            </div>
            </form>
        </Modal>
        
    );
};

export default Mymodal;