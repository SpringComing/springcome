import React from 'react';
import Info from "./Info.js";
import Search from "./Search.js";
import Messages from "./Messages.js";
import Notification from "./Notification.js";

const Header = ({alarmList,updateAlarm,deleteAlarm,updateAllAlarm,deleteReadAlarm,deleteAllAlarm}) => {
    return (
        <section className="kanban__header">
        <Search />
        <div className="kanban__header-info">
          <Messages />
          <Notification alarmList={alarmList} updateAlarm={updateAlarm} deleteAlarm={deleteAlarm} 
                        updateAllAlarm={updateAllAlarm} deleteReadAlarm={deleteReadAlarm} deleteAllAlarm={deleteAllAlarm}/>
          <Info />
        </div>
      </section>
    );
};

export default Header;