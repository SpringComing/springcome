import React, {useState, useEffect}  from "react";
import {useParams} from "react-router-dom";
import SiteLayout from "../layout/SiteLayout";
import KanbanMain from "./KanbanMain";
import Nav from "./nav/Nav";
//import processes2 from '../../assets/json/data.json';
const SERVER_URL = "http://localhost:8080";

const Kanban = () => {
  //const projectNo = 1;
  const [processes, setProcesses] = useState([]);
  const [project, setProject] = useState([]);
  const { projectNo } = useParams();
  const [alarmList, setAlarmList] = useState([]);                        //알람 데이터 상태

  if(projectNo == null) {
    location.href = `/`;
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
  
  const addProcess = async () => {
    try {
      const response = await fetch(`/api/process`, {
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              name: '새 프로세스',
              projectNo: projectNo
          })
      });

      if(!response.ok) {
          throw  `${response.status} ${response.statusText}`;
      }

      const json = await response.json();

      // insert가 안 된 경우
      if(!json.data) {
          return;
      }

      // insert가 된 경우
      let newProcesses = json.data;
      setProcesses(newProcesses);

    } catch (err) {
      console.error(err);
    }
  }

  const reUploadProcesses = async() => {
      try {
        const response = await fetch(`/api/process/${projectNo}`, {
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
  
        setProcesses(jsonResult.data);
  
      } catch (err) {
        console.error(err);
      }
  }

  const reUploadProject = async() => {
    try {
      const response = await fetch(`/api/project/attr/${projectNo}`, {
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

      setProject(jsonResult.data);

    } catch (err) {
      console.error(err);
    }
}

  useEffect(() => {
    reUploadProcesses();
    reUploadProject();
    //getAlarm();
   
  }, []); //컴포넌트 라이프사이클함수중에 didmount, willunmount 함수들과 같은효과

  return (
      <SiteLayout alarmList={alarmList}>
        <Nav 
          addProcess={ addProcess }
          project={project} />
        <KanbanMain 
          key={projectNo} 
          processes={processes} 
          setProcesses={setProcesses} 
          projectNo={projectNo} 
          reUploadProcesses={reUploadProcesses} />
      </SiteLayout>
  );
}

export default Kanban;

