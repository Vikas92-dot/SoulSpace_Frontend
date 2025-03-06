import { Route, Routes } from "react-router-dom";
import VerifyOTP from "./User/VerifyOTP";
import Register from "./User/Register";
import UserDashboard from "./User/UserDashboard";
import Signin from "./User/Signin";
import Home from "./Home";
import MeditationPage from "./Meditations";
import Auth from "./auth/Auth";

function RouteConfig(){
    return<>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Verify-otp' element={<VerifyOTP/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/UserDashboard" element={<Auth><UserDashboard /></Auth>}/>
        <Route path="/Meditations" element={<Auth><MeditationPage/></Auth>}/>
    </Routes>
    </>
}
export default RouteConfig;