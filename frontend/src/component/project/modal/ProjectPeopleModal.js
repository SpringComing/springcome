import React,{useState,useRef, useEffect} from 'react';
import Modal from "react-modal";
import ModalStyle from "../../../assets/css/component/project/ProjectPeopleModal.scss"
const SERVER_URL = "http://localhost:8080";

Modal.setAppElement('body');

const ProjectPeopleModal = ({modalIsOpen, setModalIsOpen, getPeople, project, people, excludeUser,sendProjectMSG}) => {
    const refForm = useRef(null);                           
    const [email, setEmail] = useState("");          //input email 상태
    const [flag, setFlag] = useState(true);          //모달에 프로젝트 내용 넣기위한 플래그
    const [emailCheck, setEmailCheck] = useState("") //이메일정규표현식으로 체크해서 표시할 상태
    

    /**
    * 모달에 프로젝트 내용 넣기
    */
    if(modalIsOpen && flag){
        setFlag(false);
        getPeople(project.no);
    }


    /**
    * 함수: handleSubmit 
    * 작성자: 성창현
    * 기능: 이메일 보내기
    */
    const handleSubmit = async (e) => {
    
        e.preventDefault();
        try {
            //이메일형식이 아니면 비우고 포커스후 경고글 표시
            const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
            if (!re.test(e.target.email.value) ) {
                refForm.current && refForm.current.email.focus();
                setEmailCheck("이메일 형식이 아닙니다. 다시 입력하세요");
                return;
            }
        
            setEmailCheck("초대 이메일을 보내고 있습니다.");

            const guestvo = {
                email: email,
                projectNo : project.no
            } 
        
            const response = await fetch(`/api/project/sendemail`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(guestvo)
            });

            if (!response.ok) {
                throw `response failed ${response.status} ${response.statusText}`;
            }

            const jsonResult = await response.json();

            //console.log(jsonResult);

            if (jsonResult.result !== 'success') {
                alert("jsonResult.result !== 'success");
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
                return;
            }
            
            // 이미 참석한 경우 
            if (jsonResult.data.existAttend === true) {
                setEmailCheck("이미 프로젝트에 참여하고 있습니다.");
                return;
            }

            // 초대 이메일을 보낸 경우
            console.log("jsonResult",jsonResult);
            setEmailCheck("초대 이메일을 보냈습니다");
            getPeople(project.no);
            sendProjectMSG(project.no,project.name,"프로젝트 인원이 추가되었습니다.");
            
        } catch (err) {
            console.error(err);
        }
    }


    /**
    * 함수: modalClose 
    * 작성자: 성창현
    * 기능: 모달 상태 리셋후 모달 닫기
    */
    const modalClose = () => {
        setFlag(true);
        setEmailCheck("");
        setEmail("");
        setModalIsOpen(false)
    }

   
    return (
        
        <Modal
            isOpen={ modalIsOpen }
            onRequestClose={ () => modalClose() }          //오버레이 부분을 클릭하거나 또는 Esc 키를 누를 시 모달 창이 닫히게 한다
            shouldCloseOnOverlayClick={ false }            //오버레이 클릭은 막고 Esc 키만으로 모달창을 닫게 한다
            contentLabel="Project Setting"                 //웹접근성 ex) 시작장애인이 사용시 정보 전달에 사용
            className={ ModalStyle.Modal }
            overlayClassName={ ModalStyle.Overlay }>
            
            <div className={ ModalStyle.modal_header } >
                <h2>프로젝트 팀원 설정</h2>
                <span onClick={ () => modalClose() }>
                    <i className="material-icons">clear</i>
                </span>
            </div>
            <form 
                className={ ModalStyle.project_reg }
                ref={ refForm }
                onSubmit={ handleSubmit } >
                
                <div className={ ModalStyle.text }>
                    <span>현재 팀원</span>
                </div>
                
                <div className={ ModalStyle.team_wrapper } >
                    <div className={ ModalStyle.team }>
                        {
                            
                            people.map(user => <div key={user.no} className="user">
                                                    <span className={ ModalStyle.team_profile }>
                                                    {
                                                        user.image ?  
                                                        <img style={{width:"40px", height:"40px"}} id="images" src={"data:image/;base64," + user.image}/>
                                                        :
                                                        <i class="material-icons">account_circle</i>
                                                    }
                                                        
                                                    </span>
                                                    <span className={ ModalStyle.team_name }>
                                                        { user.name } 
                                                    </span>
                                                    <span className={ ModalStyle.team_email }>
                                                        { user.email } 
                                                    </span>
                                                    <span className={ ModalStyle.team_exclude }>
                                                        <i className="material-icons"
                                                           onClick={ () => excludeUser(project.no,user.no) } >clear</i>
                                                    </span>
                                                </div> )
                        }
                    </div>
                </div>

                <div className={ ModalStyle.text }>
                    <span>팀원 초대</span>
                </div>
                <div className={ ModalStyle.modal_input } >
                    <input type='text'  
                           name="email" 
                           placeholder="초대 할 이메일을 입력해 주세요"
                           value={ email }
                           onChange={  (e) => { setEmail(e.target.value ); 
                                                setEmailCheck(""); } } />
                </div>
            </form>

            <div className={ ModalStyle.modal_btn }>
                <span className={ ModalStyle.email_check }>{ emailCheck }</span>
                <button type="submit" 
                      form="project_reg"
                      onClick={ () => { 
                              refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true})); 
                            } }>
                <span>보내기</span>
              </button>
            </div>

        </Modal>
        
    );
};

export default ProjectPeopleModal;