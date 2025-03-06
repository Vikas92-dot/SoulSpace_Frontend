import axios from "axios";
import { useState } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";



function Register() {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[level,setLevel] = useState("");
    const navigate = useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post(api.USER_REGISTER,{name,email,password,level})
        .then((response)=>{
            console.log(response.data);
            
            navigate('/Verify-otp');
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
      <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">SoulSpace Registeration</h3>
                  <form onSubmit={handleSubmit} className="px-md-2">
                    <div className="form-outline mb-4">
                      <label className="form-label" >Your Name</label>
                      <input onChange={(event)=>setName(event.target.value)} type="text" id="form3Example1q" className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" >Your Email</label>
                      <input onChange={(event)=>setEmail(event.target.value)} type="text" id="form3Example1q" className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" >Your Password</label>
                      <input onChange={(event)=>setPassword(event.target.value)} type="password" id="form3Example1q" className="form-control" />
                    </div>
                    
                    <label >Level</label>
                    <div className="mb-4">
                      <select onChange={(event)=>setLevel(event.target.value)} className="form-select">
                        <option  >Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option  value="intermediate">Intermediate</option>
                        <option  value="advanced">Advanced</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg mb-1">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Register;
  