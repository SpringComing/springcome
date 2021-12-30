import React, { useState, useEffect } from 'react';
import FullCalendar, { CalendarApi, eventTupleToStore } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import "./Calendar.js"
import Mymodal from './Mymodal'
import Mymodal2 from './Mymodal2'
const SERVER_URL = "http://localhost:8080";
let saveEvent = []
let maxNo = 0;

const Calendar = () => {

    const [event, setEvent] = useState([]);
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);     //모달 생성 상태
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const projectbox = []
    useEffect(async () => {  
      saveEvent = []
            try {
          const response = await fetch(`/api/schedule`, {
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
            alert('세션이 만료되었습니다!')
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            
          }

          for(var i = 0; i<jsonResult.data.project.length; i++){
            projectbox.push({title: jsonResult.data.project[i].name, start: jsonResult.data.project[i].startDate, end: jsonResult.data.project[i].endDate, color: jsonResult.data.project[i].color, description: jsonResult.data.project[i].description})
            saveEvent.push({title: jsonResult.data.project[i].name, start: jsonResult.data.project[i].startDate, end: jsonResult.data.project[i].endDate, color: jsonResult.data.project[i].color, description: jsonResult.data.project[i].description})
          }

          for(var i = 0; i<jsonResult.data.memo.length; i++){
            projectbox.push({title: jsonResult.data.memo[i].title, date: jsonResult.data.memo[i].date, start: jsonResult.data.memo[i].date, no: jsonResult.data.memo[i].no})
            saveEvent.push({title: jsonResult.data.memo[i].title, date: jsonResult.data.memo[i].date, start: jsonResult.data.memo[i].date, no: jsonResult.data.memo[i].no})
          }

          for(var i = 0; i<jsonResult.data.task.length; i++){
            projectbox.push({title: '└ Task :'+jsonResult.data.task[i].name, start: jsonResult.data.task[i].startDate, end: jsonResult.data.task[i].endDate, color: jsonResult.data.task[i].color, importance: jsonResult.data.task[i].importance, status: jsonResult.data.task[i].status, project: jsonResult.data.task[i].project})
            saveEvent.push({title: '└ Task : '+jsonResult.data.task[i].name, start: jsonResult.data.task[i].startDate, end: jsonResult.data.task[i].endDate, color: jsonResult.data.task[i].color, importance: jsonResult.data.task[i].importance, status: jsonResult.data.task[i].status, project: jsonResult.data.task[i].project})
          }

          maxNo = jsonResult.data.maxNo
          setEvent(projectbox)
          
        } catch (err) {
          console.error(err);
        }
      }, []);

    return (
      <div>
        <div style={{
          textAlign: "right",
          marginRight: "30px"
        }}>

        <form style={{
          textAlign: "right",
        }}>
  <select name="filter" id="filter" onChange={handleChange} style={{
    width: "170px",
    textAlign: "center"
  }}>
    <option value="none">=== 전체보기 ===</option>
    <option value="project">프로젝트</option>
    <option value="task">개인업무</option>
    <option value="memo">메모</option>
  </select>
</form>
</div>

        <div>

            <FullCalendar style={{
              margin:100
      }}
      defaultView="dayGridMonth" 
      plugins={[ dayGridPlugin, interactionPlugin ]}
      events={
        event
      }
        
        editable={dragAndDrop} // 이벤트 날짜, 위치 수정 가능
        dateClick={write} // 날짜 클릭시 이벤트
        eventClick={open}
        eventDrop={drapanddrop}
        dayMaxEventRows={3}
      
/>
<Mymodal modalIsOpen= {modalIsOpen} setModalIsOpen={setModalIsOpen} data={data} />
<Mymodal2 modalIsOpen2= {modalIsOpen2} setModalIsOpen2={setModalIsOpen2} data={data} />
      </div>
      </div>
    );


    function drapanddrop(args){
      console.log(args.event.title)
      if(!args.event.title.includes(' ● ') && !args.event.title.includes('└')){
        
      }
      else{
      saveEvent = []
      for(var i = 0; i<event.length; i++){
        
        if(event[i].no == args.event.extendedProps.no){
          var start = new Date(args.event.start);
          var year = start.getFullYear();
          var month = ('0' + (start.getMonth() + 1)).slice(-2);
          var day = ('0' + start.getDate()).slice(-2);
          var startDate = year + '-' + month  + '-' + day;       
          projectbox.push({title: args.event.title, date: startDate, start: startDate, no : args.event.extendedProps.no});
          saveEvent.push({title: args.event.title, date: startDate, start: startDate, no : args.event.extendedProps.no})
        }else{
        projectbox.push(event[i]);
        saveEvent.push(event[i]);
        }
        
      }
      setEvent(projectbox)
      dragAndDrop(args)
    }
    }

    function open(args){

        if(!args.event.title.includes(' ● ') && !args.event.title.includes('└')){
        const box2 = []
        var start = new Date(args.event.start);
        var year = start.getFullYear();
        var month = ('0' + (start.getMonth() + 1)).slice(-2);
        var day = ('0' + start.getDate()).slice(-2);
        var startDate = year + '-' + month  + '-' + day;
  
        var end = new Date(args.event.end);
        year = end.getFullYear();
        month = ('0' + (end.getMonth() + 1)).slice(-2);
        day = ('0' + end.getDate()).slice(-2);
        var endDate = year + '-' + month  + '-' + day;
  
        box2.push(args.event.title)
        box2.push(startDate)
        box2.push(endDate)
        box2.push(args.event.extendedProps.description)
  
        setData(box2)
        setModalIsOpen(true)
        }else if(args.event.title.includes('└')){

          const box2 = []
          var start = new Date(args.event.start);
          var year = start.getFullYear();
          var month = ('0' + (start.getMonth() + 1)).slice(-2);
          var day = ('0' + start.getDate()).slice(-2);
          var startDate = year + '-' + month  + '-' + day;
          var end = new Date(args.event.end);
          year = end.getFullYear();
          month = ('0' + (end.getMonth() + 1)).slice(-2);
          day = ('0' + end.getDate()).slice(-2);
          var endDate = year + '-' + month  + '-' + day;
    
          box2.push(args.event.title)
          box2.push(startDate)
          box2.push(endDate)
          box2.push(args.event.extendedProps.importance)
          box2.push(args.event.extendedProps.status)
          box2.push(args.event.extendedProps.project)
    
          setData(box2)
          setModalIsOpen2(true)
        }
        else{
          
          if (confirm("정말 삭제하시겠습니까??") == true){    //확인
            var today = new Date(args.event.start);
            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);
            var dateString = year + '-' + month  + '-' + day;
            
            saveEvent = []
            for(var i = 0; i<event.length; i++){

              if(event[i].no == null){
                projectbox.push(event[i]);  
                saveEvent.push(event[i]) 
              }else{
                console.log(event[i])
                if(event[i].no != args.event.extendedProps.no){
                  projectbox.push(event[i]);
                  saveEvent.push(event[i]);
                }
              }
           }
          
           deleteMemo(args.event.title,dateString,args.event.extendedProps.no);
           setEvent(projectbox)

        }else{   //취소
            return;
        }
        }
        
      }

      function write(args){
        saveEvent = []
        var result = prompt('메모입력');
        if(result != null && result != ''){

          maxNo += 1;

          for(var i = 0; i<event.length; i++){
            projectbox.push(event[i]);
            saveEvent.push(event[i]);
          }

          addMemo({title : ' ● ' + result, date: args.dateStr, no: maxNo})
          projectbox.push({title : ' ● ' + result, date: args.dateStr, no: maxNo})
          saveEvent.push({title : ' ● ' + result, date: args.dateStr, no: maxNo})
          setEvent(projectbox)
         
          console.log('프박')
          console.log(projectbox)
        }else{
  
        }

      }

      function handleChange(){
        const filtering = document.getElementById("filter").value
        if(filtering == 'none'){
          for(var i = 0; i<saveEvent.length; i++){
            projectbox.push(saveEvent[i])
          }
          setEvent(projectbox);
  
        }else if(filtering == 'project'){
          for(var i = 0; i<saveEvent.length; i++){
            if(saveEvent[i].color != null && !saveEvent[i].title.includes("└")){
            projectbox.push(saveEvent[i])
            }
            setEvent(projectbox)
          }
        }else if(filtering == 'memo'){
          for(var i = 0; i<saveEvent.length; i++){
            if(saveEvent[i].color == null){
            projectbox.push(saveEvent[i])
            }
            setEvent(projectbox)

          }
        }else{
          for(var i = 0; i<saveEvent.length; i++){
            if(saveEvent[i].title.includes("└")){
            projectbox.push(saveEvent[i])
            }
            setEvent(projectbox)
          }
        }
      }  
      
};

const dragAndDrop = async (args) => {

  var today = new Date(args.event.start);
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month  + '-' + day;
  

  try {
    const response = await fetch(`/api/updateMemo`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            title : args.event.title,
            date : dateString,
            no : args.event.extendedProps.no
            
        })
    });
    if(!response.ok) {
        throw  `${response.status} ${response.statusText}`;
    }
    const json = await response.json();
    if(!json.data) {
        return;
    }    
} catch (err) {
    console.error(err);
}
}

const deleteMemo = async (title,date,no) => {

  try {
      const response = await fetch(`/api/deleteMemo`, {
          method: 'put',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              title,date,no
              
          })
      });
      if(!response.ok) {
          throw  `${response.status} ${response.statusText}`;
      }
      const json = await response.json();
      if(!json.data) {
          return;
      }

  } catch (err) {
      console.error(err);
  }
}

const addMemo = async (args) => {

  try {
      const response = await fetch(`/api/addMemo`, {
          method: 'put',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              args
              
          })
      });
      if(!response.ok) {
          throw  `${response.status} ${response.statusText}`;
      }
      const json = await response.json();
      if(!json.data) {
          return;
      }

  } catch (err) {
      console.error(err);
  }
}

export default Calendar;