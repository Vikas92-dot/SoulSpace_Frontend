import axios from "axios";
import { useState } from "react";
import api from '../api';
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(api.USER_REGISTER, { name, email, password, level })
            .then((response) => {
                console.log(response.data);
                navigate('/Verify-otp');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <section className="h-100 h-custom d-flex align-items-center justify-content-center" style={{ backgroundColor: "#FFF7D6", minHeight: "100vh" }}>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3 shadow-lg">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center">SoulSpace Registration</h3>
                                <form onSubmit={handleSubmit} className="px-md-2">
                                    <div className="form-outline mb-4">
                                        <label className="form-label">Your Name</label>
                                        <input onChange={(event) => setName(event.target.value)} type="text" className="form-control" required />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label">Your Email</label>
                                        <input onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" required />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label">Your Password</label>
                                        <input onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" required />
                                    </div>

                                    <label>Level</label>
                                    <div className="mb-4">
                                        <select onChange={(event) => setLevel(event.target.value)} className="form-select" required>
                                            <option value="">Select Level</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-warning btn-lg text-dark">Submit</button>
                                    </div>
                                    <p className="mb-0 mt-4 text-dark text-center">
                                                        Don't have an account?{" "}
                                                        <Link to="/Signin" className="text-warning fw-bold">
                                                          Register
                                                        </Link>
                                                      </p>
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
