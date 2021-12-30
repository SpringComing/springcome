import React from 'react';
import Logo from "./Logo";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer"

export default function SiteLayout({children,alarmList,updateAlarm,deleteAlarm,updateAllAlarm,deleteReadAlarm,deleteAllAlarm }) {
    return (
            <div className="spring-wrapper">
                <div className="spring">
                    <Logo />
                    <Header alarmList={alarmList} updateAlarm={updateAlarm} deleteAlarm={deleteAlarm} 
                            updateAllAlarm={updateAllAlarm} deleteReadAlarm={deleteReadAlarm} deleteAllAlarm={deleteAllAlarm}/>
                    <Sidebar />
                    {children}
                </div>
                    <Footer/>
            </div>
    );
}