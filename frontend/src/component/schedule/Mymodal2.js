import { string } from 'prop-types';
import React,{useState,useRef} from 'react';
import Modal from "react-modal";
import ModalStyle from "../../assets/css/component/project/CalendarModal.scss"



Modal.setAppElement('body');
const Mymodal2 = ({modalIsOpen2, setModalIsOpen2, data}) => {

   const refForm = useRef(null);                        
   let importance ='';

   const modalClose = () => {
    setModalIsOpen2(false)
   }


    return (
        
        <Modal
            isOpen={ modalIsOpen2 }
            className={ ModalStyle.Modal }
            onRequestClose={ () => modalClose() }          //오버레이 부분을 클릭하거나 또는 Esc 키를 누를 시 모달 창이 닫히게 한다
            shouldCloseOnOverlayClick={ false }            //오버레이 클릭은 막고 Esc 키만으로 모달창을 닫게 한다
            contentLabel="Project Setting"                 //웹접근성 ex) 시작장애인이 사용시 정보 전달에 사용
            className={ ModalStyle.Modal }
            overlayClassName={ ModalStyle.Overlay }
            >
            
            <div className={ ModalStyle.modal_header }> 
                <center><h2>Task 정보</h2></center>
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
                           placeholder={' '+ data[5]}
                           disabled
                        />
                </div>

                <div className={ ModalStyle.modal_input }>
                    <span className='text'>Task 이름</span>
                    <input type='text'  
                           name="projectName" 
                           placeholder={' ' + data[0]}
                           disabled
                        />
                </div>

                <div className={ ModalStyle.modal_input }>
                    <span className='text'>중요도</span>
                    <input type='text'  
                           name="projectName" 
                           placeholder={' ' + makeStar(data[3])}
                           disabled
                        />
                </div>

                <div className={ ModalStyle.modal_input }>
                    <span className='text'>프로세스 상태</span>
                    <input type='text'  
                           name="projectName" 
                           placeholder={' ' + data[4]}
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
                      onClick={ () => {  
                              modalClose(); 
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
    function makeStar(args){
        for(var i=0; i<args; i++){
            importance+='★'
        }
        return importance;
    }

    
};

export default Mymodal2;