import { Route, Routes } from "react-router-dom";
import VerifyOTP from "./User/VerifyOTP";
import Register from "./User/Register";
import UserDashboard from "./User/UserDashboard";
import Signin from "./User/Signin";
import Home from "./LandingPage/Home";
import MeditationPage from "./MeditationPage/Meditations";
import Auth from "./auth/Auth";
import Category from "./MeditationPage/Category";
import MediaDisplayPage from "./MeditationPage/MediaDisplay";
import UserProfile from "./User/UserProfile";

function RouteConfig(){
    return<>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Verify-otp' element={<VerifyOTP/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/UserDashboard" element={<Auth><UserDashboard /></Auth>}/>
        <Route path="/Meditations" element={<Auth><MeditationPage/></Auth>}/>
        <Route path="/Meditations/type/:type" element={<Auth><Category/></Auth>}></Route>
        <Route path='/Meditations/type/:type/:category' element={<Auth><MediaDisplayPage/></Auth>}></Route>
        <Route path="/profile" element={<Auth><UserProfile/></Auth>}/>
    </Routes>
    </>
}
export default RouteConfig;