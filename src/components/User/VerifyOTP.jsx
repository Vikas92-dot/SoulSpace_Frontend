import axios from "axios";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const[email,setEmail] = useState("");
  const[otp,setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit=(event)=>{
      event.preventDefault();
      axios.post(api.VERIFY_OTP,{email,otp})
      .then((response)=>{
        console.log(response.data);
        navigate('/UserDashboard');
      }).catch(err=>{
        console.log(err);
      })
  }
    return (
      <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6 col-xl-4">
              <div className="card rounded-3 p-4">
                <h3 className="mb-4 text-center">Verify OTP</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input onChange={(event)=>setEmail(event.target.value)} type="email" id="email" className="form-control" required />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="otp">OTP</label>
                    <input onChange={(event)=> setOtp(event.target.value)} type="text" id="otp" className="form-control" required />
                  </div>
                  <button type="submit" className="btn btn-success btn-lg w-100">Verify</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default VerifyOTP;
  