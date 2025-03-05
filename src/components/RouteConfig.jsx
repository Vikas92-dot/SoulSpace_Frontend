import { Route, Routes } from "react-router-dom";
import VerifyOTP from "./User/VerifyOTP";
import Register from "./User/Register";
import UserDashboard from "./User/UserDashboard";
import Signin from "./User/Signin";
import Home from "./Home";

function RouteConfig(){
    return<>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Verify-otp' element={<VerifyOTP/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/UserDashboard" element={<UserDashboard/>}/>
    </Routes>
    </>
}
export default RouteConfig;