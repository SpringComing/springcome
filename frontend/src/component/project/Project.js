import React,{ useState, useEffect, useRef }  from "react";
import SiteLayout from "../layout/SiteLayout"
import ProjectMain from "./ProjectMain"
import Nav from "./nav/Nav"
import ProjectAddModal from "./modal/ProjectAddModal";
import ProjectUpdateModal from "./modal/ProjectUpdateModal"
import ProjectPeopleModal from "./modal/ProjectPeopleModal"
import SockJsClient from 'react-stomp';
import  Cookie  from "react-cookies"
//import projects2 from "../../assets/json/data.json"
const SERVER_URL = "http://34.64.73.89:8080";
/**
 * 컴포넌트: Project
 * 작성자: 성창현
 * 책임: 프로젝트화면 기능 상태 컴포넌트
 */
const Project = () => {


  const $websocket = useRef (null); //웹소켓 Ref

  const [projects, setProjects] = useState([]);                          //프로젝트들 데이터 상태
  const [project, setProject] = useState({});                            //설정할 프로젝트 데이터 상태
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);           //프로젝트 추가 모달 생성 상태
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);     //프로젝트 기본 설정 모달 생성 상태
  const [peopleModalIsOpen, setPeopleModalIsOpen] = useState(false);     //프로젝트 인원 설정 모달 생성 상태
  const [people, setPeople] = useState([]);                              //프로젝트 인원 상태
  const [alarmList, setAlarmList] = useState([]);                        //알람 데이터 상태

  useEffect(() => { 
    getProject();
    getAlarm();
  },[]); //project 초기데이터 가져오기


  /**
   * 함수: getProject 
   * 작성자: 성창현
   * 기능: fetch()사용하여 프로젝트 데이터 가져오기
   */
  const getProject = async () => {
    
    try {
      const response = await fetch(`/api/project`, {
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
        location.href = `/api/checkSession`
        alert("세션이 만료 되었습니다.");
        throw new Error(`${jsonResult.result} ${jsonResult.message}`);
      }
      
      setProjects(jsonResult.data);

    } catch (err) {
      console.error(err);
    }
  }


  /**
    * 함수: getPeople 
    * 작성자: 성창현
    * 기능: 프로젝트 팀원의 데이터를 가져와서 상태에 반영 
    */
  const getPeople = async (projectNo) => {
    try {
        const response = await fetch(`/api/project/people/` + projectNo, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // 통신 응답 받기 실패할 경우
        if (!response.ok) {
            alert("프로젝트 팀원 데이터 통신이 실패 했습니다. 다시 시도하세요");
            throw `response failed ${response.status} ${response.statusText}`;
        }

        const jsonResult = await response.json();

        // 팀원 데이터 가져오기 실패할 경우
        if (jsonResult.result !== 'success') {
          location.href = `/api/checkSession`
          alert("세션이 만료 되었습니다.");
          throw new Error(`${jsonResult.result} ${jsonResult.message}`);
        }
        
        // 가져온 팀원 데이터 상태에 셋팅
        
        setPeople(jsonResult.data);
        
        
    } catch (err) {
        console.error(err);
    }
  }

  /**
    * 함수: deleteUser 
    * 작성자: 성창현
    * 기능: 팀원을 프로젝트에서 제외 하기 위해 attend table의 유저 데이터를 삭제한다
    */
  const excludeUser = async (projectNo, userNo) => {
    try {
        const response = await fetch(`/api/project/people?projectNo=${projectNo}&userNo=${userNo}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // 통신 응답 받기 실패할 경우
        if (!response.ok) {
            alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
            throw `response failed ${response.status} ${response.statusText}`;
        }

        const jsonResult = await response.json();

        // 업데이트 실패시
        if (jsonResult.result !== 'success') {
            alert("서버에서 삭제가 실패했습니다. 다시 시도하세요");
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
        }
        
        //업데이트 성공시
        //console.log("jsonResult",jsonResult);
        setPeople(people.filter(user => user.no !== userNo) );

    } catch (err) {
        console.error(err);
    }
  }

  /**
    * 함수: deleteProject 
    * 작성자: 성창현
    * 기능: 프로젝트와 관련된 모든 데이터 삭제
    */
  const deleteProject = async (projectNo) => {
    try {
        const response = await fetch(`/api/project/${projectNo}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // 통신 응답 받기 실패할 경우
        if (!response.ok) {
            alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
            throw `response failed ${response.status} ${response.statusText}`;
        }

        const jsonResult = await response.json();

        // 삭제 실패시
        if (jsonResult.result !== 'success') {
            alert("서버에서 삭제가 실패했습니다. 다시 시도하세요");
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
        }
        
        //삭제 성공시
        //console.log("jsonResult",jsonResult);
        setProjects(projects.filter(project => project.no !== projectNo) );

    } catch (err) {
        console.error(err);
    }
  }

  
  /**
   * 함수: openModal 
   * 작성자: 성창현
   * 기능: modal 파라미터로 특정 Modal창 띄우기, project 상태 파라미터 no로 바꾸기
   */
  const openModal =  (no, modal) => {
    setProject(projects.filter((project) => project.no === no )[0]);
    modal === 'update' ? setUpdateModalIsOpen(true) : setPeopleModalIsOpen(true);
  }


  /**
   * 함수: sendProjectMSG
   * 작성자: 성창현
   * 기능: 프로젝트 기능 관련 메세지 서버에 전달
   */
  const sendProjectMSG =  (projectNo,projectName,msg) => {
    const socketData ={
      projectNo : projectNo,
      projectName : projectName,
      msg : msg
    }
    $websocket.current.sendMessage ('/app/project',JSON.stringify(socketData)); 
  }

  /**
   * 함수: getAlarm
   * 작성자: 성창현
   * 기능: 알람 데이터 가져온후 알람 상태 셋팅
   */
  const getAlarm = async () => {
    try {
        const response = await fetch(`/api/alarm`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // 통신 응답 받기 실패할 경우
        if (!response.ok) {
            alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
            throw `response failed ${response.status} ${response.statusText}`;
        }

        const jsonResult = await response.json();

        // 세션만료시
        if (jsonResult.result !== 'success') {
          location.href = `/api/checkSession`
          alert("세션이 만료 되었습니다.");
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
        }
        
        // select 성공시
        //console.log(jsonResult.data);
        setAlarmList(jsonResult.data);

    } catch (err) {
        console.error(err);
    }
  }

   /**
   * 함수: addAlarm
   * 작성자: 성창현
   * 기능: 알람 데이터 insert
   */
  const addAlarm = async (data) => {
      const alarm = { 
        alarmNo: null,
        message: data.projectName +' : '+ data.msg,
        regDate: null,
        status: 0,
        type: "PROJECT",
        userNo: Cookie.load('userno')
      }
      
      try {
          const response = await fetch(`/api/alarm`, {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify(alarm)
          });

  
          // 통신 응답 받기 실패할 경우
          if (!response.ok) {
              alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
              throw `response failed ${response.status} ${response.statusText}`;
          }
  
          const jsonResult = await response.json();
  
          // 세션만료시
          if (jsonResult.result !== 'success') {
            location.href = `/api/checkSession`
            alert("세션이 만료 되었습니다.");
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
          }
          
          // insert 성공시
          //console.log(jsonResult.data);
          getAlarm();
          
      } catch (err) {
          console.error(err);
      }
  }

   /**
   * 함수: updateAlarm
   * 작성자: 성창현
   * 기능: 알람 데이터 update , 읽은 알람 으로 바꿈
   */
    const updateAlarm = async (alarmNo) => {
  
      try {
          const response = await fetch(`/api/alarm/${alarmNo}`, {
              method: 'put',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          });
  
          // 통신 응답 받기 실패할 경우
          if (!response.ok) {
              alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
              throw `response failed ${response.status} ${response.statusText}`;
          }
  
          const jsonResult = await response.json();
  
          // 세션만료시
          if (jsonResult.result !== 'success') {
            location.href = `/api/checkSession`
            alert("세션이 만료 되었습니다.");
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
          }
          
          // update 성공시
          //console.log(jsonResult.data);
          getAlarm();
          
      } catch (err) {
          console.error(err);
      }
   }

   /**
   * 함수: deleteAlarm
   * 작성자: 성창현
   * 기능: 알람 데이터 삭제
   */
    const deleteAlarm = async (alarmNo) => {
  
      try {
          const response = await fetch(`/api/alarm/${alarmNo}`, {
              method: 'delete',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          });
  
          // 통신 응답 받기 실패할 경우
          if (!response.ok) {
              alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
              throw `response failed ${response.status} ${response.statusText}`;
          }
  
          const jsonResult = await response.json();
  
          // 세션만료시
          if (jsonResult.result !== 'success') {
            location.href = `/api/checkSession`
            alert("세션이 만료 되었습니다.");
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
          }
          
          // delete 성공시
          //console.log(jsonResult.data);
          getAlarm();
          
      } catch (err) {
          console.error(err);
      }
   }

   /**
   * 함수: updateAllAlarm
   * 작성자: 성창현
   * 기능: 모든 알람 데이터 읽음표시
   */
    const updateAllAlarm = async () => {
  
      try {
          const response = await fetch(`/api/alarm/all`, {
              method: 'put',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          });
  
          // 통신 응답 받기 실패할 경우
          if (!response.ok) {
              alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
              throw `response failed ${response.status} ${response.statusText}`;
          }
  
          const jsonResult = await response.json();
  
          // 세션만료시
          if (jsonResult.result !== 'success') {
            location.href = `/api/checkSession`
            alert("세션이 만료 되었습니다.");
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
          }
          
          // update 성공시
          //console.log(jsonResult.data);
          getAlarm();
          
      } catch (err) {
          console.error(err);
      }
   }

  /**
   * 함수: deleteReadAlarm
   * 작성자: 성창현
   * 기능: 모든 읽은 알람 삭제
   */
     const deleteReadAlarm = async () => {
  
      try {
          const response = await fetch(`/api/alarm/read`, {
              method: 'delete',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          });
  
          // 통신 응답 받기 실패할 경우
          if (!response.ok) {
              alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
              throw `response failed ${response.status} ${response.statusText}`;
          }
  
          const jsonResult = await response.json();
  
          // 세션만료시
          if (jsonResult.result !== 'success') {
            location.href = `/api/checkSession`
            alert("세션이 만료 되었습니다.");
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
          }
          
          // delete 성공시
          //console.log(jsonResult.data);
          getAlarm();
          
      } catch (err) {
          console.error(err);
      }
   }

   /**
   * 함수: deleteAllAlarm
   * 작성자: 성창현
   * 기능: 모든 알람 삭제
   */
    const deleteAllAlarm = async () => {
  
      try {
          const response = await fetch(`/api/alarm/all`, {
              method: 'delete',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          });
  
          // 통신 응답 받기 실패할 경우
          if (!response.ok) {
              alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
              throw `response failed ${response.status} ${response.statusText}`;
          }
  
          const jsonResult = await response.json();
  
          // 세션만료시
          if (jsonResult.result !== 'success') {
            location.href = `/api/checkSession`
            alert("세션이 만료 되었습니다.");
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
          }
          
          // delete 성공시
          //console.log(jsonResult.data);
          getAlarm();
          
      } catch (err) {
          console.error(err);
      }
   }

    return (
      <SiteLayout alarmList={alarmList} updateAlarm={updateAlarm} deleteAlarm={deleteAlarm} 
                  updateAllAlarm={updateAllAlarm} deleteReadAlarm={deleteReadAlarm} deleteAllAlarm={deleteAllAlarm} >
                    
        <Nav setModalIsOpen = { setAddModalIsOpen } />
        <ProjectMain projects={ projects } openModal={ openModal } />

        <ProjectAddModal modalIsOpen= { addModalIsOpen } 
                         setModalIsOpen={ setAddModalIsOpen } 

                         getProject={ getProject } />


        <ProjectUpdateModal modalIsOpen= { updateModalIsOpen } 
                            setModalIsOpen={ setUpdateModalIsOpen } 
                            project={ project }

                            getProject={ getProject }
                            deleteProject={ deleteProject } 
                            sendProjectMSG={sendProjectMSG} />


        <ProjectPeopleModal modalIsOpen= { peopleModalIsOpen } 
                            setModalIsOpen={ setPeopleModalIsOpen } 
                            project={ project }

                            people={ people }
                            getPeople={ getPeople }
                            excludeUser={ excludeUser } 
                            sendProjectMSG={sendProjectMSG} />
        <SockJsClient 
                        url="/socket" 
                        topics={ ['/topics/project/' + Cookie.load('userno')] } 
                        onMessage={data => {  addAlarm(data); 
                                              console.log ("소켓 리시브 data : ",  data); 
                                          }}     
                        ref={$websocket} />

      </SiteLayout>
    );
};


export default Project;

