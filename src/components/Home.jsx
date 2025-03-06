import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from '../assets/Logo4.png';
import background from '../assets/Peace.png';
import './Logo.css';

function Home() {
    return (
        <div className='main-div'>

        
        <div className='hero-section' style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '95vh',
            width: '100%',
        }}>
            <nav className="navbar navbar-expand-lg">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="container d-flex flex-column align-items-center">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav gap-4" style={{ fontSize: "20px", color: "white", listStyle: "none", padding: 0 }}>
                            <li className="nav-item" style={{ transition: "0.3s" }}>
                                <Link className="nav-link" to="/" style={{ color: "white", textDecoration: "none" }}
                                    onMouseOver={(e) => e.target.style.color = "#FFA500"}
                                    onMouseOut={(e) => e.target.style.color = "white"}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item" style={{ transition: "0.3s" }}>
                                <Link className="nav-link" to="/Meditations" style={{ color: "white", textDecoration: "none" }}
                                    onMouseOver={(e) => e.target.style.color = "#FFA500"}
                                    onMouseOut={(e) => e.target.style.color = "white"}>
                                    Meditations
                                </Link>
                            </li>
                            <li className="nav-item" style={{ transition: "0.3s" }}>
                                <Link className="nav-link" to="/Journal" style={{ color: "white", textDecoration: "none" }}
                                    onMouseOver={(e) => e.target.style.color = "#FFA500"}
                                    onMouseOut={(e) => e.target.style.color = "white"}>
                                    Journal
                                </Link>
                            </li>
                            <li className="nav-item" style={{ transition: "0.3s" }}>
                                <Link className="nav-link" to="/Community" style={{ color: "white", textDecoration: "none" }}
                                    onMouseOver={(e) => e.target.style.color = "#FFA500"}
                                    onMouseOut={(e) => e.target.style.color = "white"}>
                                    Community
                                </Link>
                            </li>
                            <li className="nav-item" style={{ transition: "0.3s" }}>
                                <Link className="nav-link" to="/Signin" style={{ color: "white", textDecoration: "none" }}
                                    onMouseOver={(e) => e.target.style.color = "#FFA500"}
                                    onMouseOut={(e) => e.target.style.color = "white"}>
                                    Login/Signup
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{ marginTop: "120px", marginLeft: "100px", height: "400px", alignItems: "center", justifyContent: "center" }}>
                <h1 style={{ color: "white" }}>
                    "Find Peace in the Digital World"
                </h1>
                <div style={{ marginTop: "20px", marginLeft: "90px" }}>
                    <Button variant="contained" color="warning" style={{ margin: "10px" }} component={Link} to="/Meditations">
                        Start Meditating
                    </Button>
                    <Button variant="contained" color="warning" style={{ margin: "10px" }} component={Link} to="/Features">
                        Explore Features
                    </Button>
                </div>
            </div>
        </div>
        <div>
            
        </div>
    </div>
    );
}

export default Home;
