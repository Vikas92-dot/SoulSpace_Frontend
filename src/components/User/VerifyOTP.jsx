import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function VerifyOTP() {
  const { email } = useParams();
  const[emailId,setEmailId] = useState("");
  const[otp,setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmailId(email); 
  }, [email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(api.VERIFY_OTP, { email: emailId, otp })
      .then((response) => {
        console.log(response.data);
        toast.success("OTP Verified successfully!");
        setTimeout(() => {
          navigate('/UserDashboard');
        }, 2000);
      })
      .catch(err => {
        toast.error("Invalid OTP!");
        console.error(err);
      });
  };
    return (
      <section  style={{ background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)", height:"100vh" }}>
        <ToastContainer/>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6 col-xl-4">
              <div className="card rounded-3 p-4">
                <h3 className="mb-4 text-center">Verify OTP</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label">Email</label>
                    <input label="email" value={emailId} onChange={(event)=>setEmailId(event.target.value)} type="email" id="email" className="form-control" required readOnly // Prevent user from changing the email 
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="otp">OTP</label>
                    <input onChange={(event)=> setOtp(event.target.value)} type="text" id="otp" className="form-control" required />
                  </div>
                  <button type="submit" className="btn btn-warning btn-lg w-100">Verify</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default VerifyOTP;
  