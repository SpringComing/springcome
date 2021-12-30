import React, { useEffect, useRef, useState } from "react";
import SockJsClient from 'react-stomp'; 
// import StompJs from 'stompjs';
// import SockJS from 'sockjs-client';


function App () { 
    const $websocket = useRef (null); 

    const handleMsg = msg => { 
        console.log (msg); 
    }; 

    const handleClickSendTo = () => { 
        // console.log ("1click!!!");
        let test = {
            test : 'test'
          }
        $websocket.current.sendMessage ('/app/sendTo',JSON.stringify(test)); 
    }; 

    const handleClickSendTemplate = () => { 
        // console.log ("2click!!!");
        $websocket.current.sendMessage ('/Template'); 
    }; 
    
    return ( 
        <div> 
            <SockJsClient 
                        url="/socket" 
                        topics={ ['/topics/sendTo', '/topics/template', '/topics/api'] } 
                        onMessage={msg => { console.log ("message : ", msg); }}     
                        ref={$websocket} /> 

            <button onClick={handleClickSendTo}>
                SendTo
            </button> 

            <button onClick={handleClickSendTemplate}>
                SendTemplate
            </button> 
        </div> 
    ); 
} 
        
export default App;






//import React, { useEffect, useState, useRef } from "react";

// const SocketTest = () => {
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [sendMsg, setSendMsg] = useState(false);
//   const [items, setItems] = useState([]);

//   const webSocketUrl = 'ws://localhost:7777/socket';
//   let ws = useRef(null);

//   // 소켓 객체 생성
//   useEffect(() => {
//     if (!ws.current) {
//       ws.current = new WebSocket(webSocketUrl);
//       ws.current.onopen = () => {
//         console.log("connected to " + webSocketUrl);
//         setSocketConnected(true);
//       };
//       ws.current.onclose = (error) => {
//         console.log("disconnect from " + webSocketUrl);
//         console.log(error);
//       };
//       ws.current.onerror = (error) => {
//         console.log("connection error " + webSocketUrl);
//         console.log(error);
//       };
//       ws.current.onmessage = (evt) => {
//         const data = JSON.parse(evt.data);
//         console.log(data);
//         setItems((prevItems) => [...prevItems, data]);
//       };
//     }

//     return () => {
//       console.log("clean up");
//       ws.current.close();
//     };
//   }, []);

//   // 소켓이 연결되었을 시에 send 메소드
//   useEffect(() => {
//     if (socketConnected) {
//       ws.current.send(
//         JSON.stringify({
//           message: sendMessage,
//         })
//       );

//       setSendMsg(true);
//     }
//   }, [socketConnected]);

//   return (
//     <div>
//       <div>socket</div>
//       <div>socket connected : {`${socketConnected}`}</div>
//       <div>res : </div>
//       <div>
//         {items.map((item) => {
//           return <div>{JSON.stringify(item)}</div>;
//         })}
//       </div>
//     </div>
//   );
// };

// export default SocketTest;