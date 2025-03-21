import axios from "axios";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ForgotPassword() {
  const[emailId,setEmailId] = useState("");
  const[otp,setOtp] = useState("");
  const[password,setPassword] = useState("");
  const navigate = useNavigate();

  const getOtp = (event) => {
    event.preventDefault();
    axios.put(api.FORGOT_OTP, { email: emailId })
      .then((response) => {
        console.log(response.data);
        toast.success("OTP Send successfully!");
      })
      .catch(err => {
        toast.error("Error in sending OTP");
        console.error(err);
      });
  };
  const handleSubmit = (event) =>{
    event.preventDefault();
    axios.put(api.FORGOT_PASSWORD,{email:emailId, otp, password})
        .then((response)=>{
            console.log(response.data);
            toast.success("Password changed successfully.");
            setTimeout(()=>{
                navigate('/Signin');
            },2000);            
        }).catch(err => {
            toast.error("Enter password");
            console.error(err);
          });
  }
    return (
      <section  style={{ background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)", height:"100vh" }}>
        <ToastContainer/>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6 col-xl-4">
              <div className="card rounded-3 p-4">
                <h3 className="mb-4 text-center">Forgot Password</h3>
                <form>
                  <div className="form-outline mb-4">
                    <label className="form-label">Email</label>
                    <input label="email" value={emailId} onChange={(event)=>setEmailId(event.target.value)} type="email" id="email" className="form-control" required  
                    />
                    <button onClick={getOtp} style={{marginTop: 15,width:"100%"}} className="btn btn-success btn-sm">Get OTP</button>
                  </div>
                  <label className="form-label" htmlFor="otp">OTP</label>
                  <div  className="form-outline mb-4">
                    
                    <input onChange={(event)=> setOtp(event.target.value)} type="text" id="otp" className="form-control" required />
                    
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label">New Password</label>
                    <input label="password" value={password} onChange={(event)=>setPassword(event.target.value)} type="passsword" id="password" className="form-control" required  
                    />
                  </div>
                  <button onClick={handleSubmit} type="submit" className="btn btn-warning btn-lg w-100">Change Password</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default ForgotPassword;
  