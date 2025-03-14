import { Route, Routes } from "react-router-dom";
import VerifyOTP from "./User/VerifyOTP";
import Register from "./User/Register";

import Signin from "./User/Signin";
import Home from "./LandingPage/Home";
import MeditationPage from "./MeditationPage/Meditations";
import Auth from "./auth/Auth";
import Category from "./MeditationPage/Category";
import MediaDisplayPage from "./MeditationPage/MediaDisplay";
import UserProfile from "./User/UserProfile";
import CommunityForum from "./CommunityForum/Community";
import UserDashboard from "./User/UserDashboard/UserDashboard";
import JournalEntry from "./Journal/JournalEntry";
import Notifications from "./Notifications/Notifications";

function RouteConfig(){
    return<>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Verify-otp/:email' element={<VerifyOTP/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/UserDashboard" element={<Auth><UserDashboard /></Auth>}/>
        <Route path="/Meditations" element={<Auth><MeditationPage/></Auth>}/>
        <Route path="/Meditations/type/:type" element={<Auth><Category/></Auth>}></Route>
        <Route path='/Meditations/type/:type/:category' element={<Auth><MediaDisplayPage/></Auth>}></Route>
        <Route path="/profile" element={<Auth><UserProfile/></Auth>}/>
        <Route path="/community" element={<Auth><CommunityForum/></Auth>}/>
        <Route path="/community" element={<Auth><CommunityForum/></Auth>}/>
        <Route path="/journal" element={<Auth><JournalEntry/></Auth>}/>
        <Route path="/notifications" element={<Auth><Notifications/></Auth>}/>


    </Routes>
    </>
}
export default RouteConfig;