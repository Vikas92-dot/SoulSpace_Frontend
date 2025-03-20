import Sidebar from "../User/SideBar";
import GetNotifications from "./GetNotifications";
import SetNotification from "./SetNotification";

function Notifications(){
    return <>
        <div style={{display:"flex",background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)"}}>
            
        <Sidebar/>
        <SetNotification/>
        <GetNotifications/>
        
        </div>
    </>
}
export default Notifications;