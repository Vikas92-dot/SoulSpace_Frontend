import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function Auth({children}){
   const {isLoggedIn} = useSelector((store)=>store.User);
   if(isLoggedIn)
    return children;
   return <Navigate to="/Signin"/>
}

export default Auth;