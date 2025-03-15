import SideBarAdmin from "./SideBarAdmin";
import UserList from "./UserList";

function AdminDashboard(){
    return<>
        <div style={{display:"flex"}}>
        <SideBarAdmin/>
        <UserList/>
        </div>
    </>
}
export default AdminDashboard;
