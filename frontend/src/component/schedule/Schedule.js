import React,{useState,useEffect} from 'react';
import SiteLayout from "../layout/SiteLayout"
import Calendar from './Calendar';

const Schedule = () => {
    const [alarmList, setAlarmList] = useState([]);                        //알람 데이터 상태
    // useEffect(() => { 
    //     getAlarm();
    //   },[]); 

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
    return (
        <div>
        <SiteLayout alarmList={alarmList}>
            <section className="kanban__nav">
                <div className="kanban__nav-wrapper">
                    <div className="kanban__nav-name">
                    <div className="kanban-name">Studio Schedule</div>
                    </div>
                </div>
            </section>
            <section className="kanban__main">
                <Calendar />
                <div className="kanban__main-wrapper" />
            </section>
        </SiteLayout>
        
        
        </div>
    );
};

export default Schedule;