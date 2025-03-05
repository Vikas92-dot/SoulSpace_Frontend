import axios from "axios";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Signin(){
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post(api.USER_LOGIN,{email,password})
    .then((response)=>{
          console.log(response.data);
        navigate('/UserDashboard');
    })
  }
    return<>
    <section className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-body p-4">
                <div className="text-center">
                  <h3 className="fw-bold">Sign In</h3>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter a valid email address"
                      value={email}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-decoration-none">
                      Forgot password?
                    </a>
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary btn-lg w-100">
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <a href="#!" className="text-primary">
                    Register
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
}
export default Signin;