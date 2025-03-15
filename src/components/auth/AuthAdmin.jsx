import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function AuthAdmin({children}){
   const {isLoggedIn} = useSelector((store)=>store.Admin);
   if(isLoggedIn)
    return children;
   return <Navigate to="/sign-in-admin"/>
}

export default AuthAdmin;