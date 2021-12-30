import App from "./App.js";
import ReactDOM from "react-dom";
import React from 'react';

import  Cookie  from "react-cookies"
const SERVER_URL = "http://localhost:8080";
function checkSession(){
    location.href = `/api/checkSession`
    
}

if(Cookie.load('useremail') != null){
ReactDOM.render(
    <App />
    ,
    document.getElementById("root")
);
}else{
    checkSession();
    alert('로그인이 필요합니다.');
}