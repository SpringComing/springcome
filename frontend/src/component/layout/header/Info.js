import React from "react";
import cookie from 'react-cookies'
import { useState, useEffect } from 'react';
const SERVER_URL = "http://localhost:8080";

let test;

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

window.onload = async() =>{
  
  try {
    const response = await fetch(`/api/profile`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            

        })
    });

    if(!response.ok) {
        throw  `${response.status} ${response.statusText}`;
    }

    const json = await response.json();

    if(!json.data) {
        return;
    }
    



    if(json.data.image == null){
      document.getElementById("images").src = "https://bootdey.com/img/Content/avatar/avatar7.png";
    test = "https://bootdey.com/img/Content/avatar/avatar7.png"
    }else{
    document.getElementById("images").src = "data:image/;base64," + json.data.image;
    test = "data:image/;base64," + json.data.image;
    }
  } catch (err) {
    console.error(err);
  }
}

class Info extends React.Component {

  render() {
    
    return (
      <React.Fragment>

        <div className="name-user">{cookie.load('useremail')}</div>
        <div className="avatar-user">
          
       
        
        <div className="dropdown">
  {/* <button onClick={myFunction} className="dropbtn">Dropdown</button> */}
  <img style={{width:"40px", height:"40px"}} className="dropbtn" id="images" src={test || null} onClick={myFunction}/>
  <div id="myDropdown" className="dropdown-content">
    <a href="/profile">Profile</a>
    <a href="/logout">Logout</a>
  </div>
</div>
 
        </div>
      </React.Fragment>
    );
  }

}


export default Info;
