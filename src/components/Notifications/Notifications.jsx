import Sidebar from "../User/SideBar";
import GetNotifications from "./GetNotifications";
import SetNotification from "./SetNotification";

function Notifications(){
    return <>
        <div style={{display:"flex"}}>
            
        <Sidebar/>
        <SetNotification/>
        
        </div>
    </>
}
export default Notifications;