import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import '../Logo.css';
import { useEffect, useState } from 'react';

function HeroSection() {
    const [navbarBg, setNavbarBg] = useState("transparent");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarBg("rgba(245, 126, 22, 0.5)"); 
            } else {
                setNavbarBg("transparent");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className='hero-section' style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 80%, rgb(255, 255, 255) 100%), url('/images/meditation-24.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100%',
            }}>
        <nav className="navbar navbar-expand-lg fixed-top" style={{
                backgroundColor: navbarBg, 
                transition: "background-color 0.3s ease-in-out",
                width: "100%",  
                zIndex: "1000",
                padding: "10px 0"
            }}>

            <div className="logo">
                <img src="/images/Logo4.png" alt="Logo" />
            </div>
            <div className="container d-flex flex-column align-items-center" style={{ marginLeft: "20%" }}>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-4" style={{ fontSize: "20px", color: "white", listStyle: "none", padding: 0, fontWeight: "bold" }}>

                        <li className="nav-item" style={{ transition: "0.3s" }}>
                            <Link className="nav-link" to={'/'} style={{ color: "white", textDecoration: "none" }}
                            onMouseOver={(e) => e.target.style.color = "#FFA500"} onMouseOut={(e) => e.target.style.color = "white"}>Home</Link>
                        </li>

                        <li className="nav-item" style={{ transition: "0.3s" }}>
                            <Link className="nav-link" to={'/Meditations'} style={{ color: "white", textDecoration: "none" }}
                            onMouseOver={(e) => e.target.style.color = "#FFA500"} onMouseOut={(e) => e.target.style.color = "white"}>Meditation</Link>
                        </li>

                        <li className="nav-item" style={{ transition: "0.3s" }}>
                            <Link className="nav-link" to={'/journal'} style={{ color: "white", textDecoration: "none" }}
                            onMouseOver={(e) => e.target.style.color = "#FFA500"} onMouseOut={(e) => e.target.style.color = "white"}>Journal</Link>
                        </li>

                        <li className="nav-item" style={{ transition: "0.3s" }}>
                            <Link className="nav-link" to={'/community'} style={{ color: "white", textDecoration: "none" }}
                            onMouseOver={(e) => e.target.style.color = "#FFA500"} onMouseOut={(e) => e.target.style.color = "white"}>Community</Link>
                        </li>
                        
                        <li className="nav-item" style={{ transition: "0.3s" }}>
                            <Link className="nav-link" to={'/Signin'} style={{ color: "white", textDecoration: "none" }}
                            onMouseOver={(e) => e.target.style.color = "#FFA500"} onMouseOut={(e) => e.target.style.color = "white"}>Signin</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div style={{ marginLeft: "70px", height: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1 style={{ color: "white", marginTop: "18%" }}>
                "Find Peace in the Digital World"
            </h1>
            <div style={{ marginTop: "20px", marginLeft: "80px" }}>
                <Button variant="contained" color="warning" style={{ margin: "10px" }} component={Link} to="/Meditations">
                    Start Meditating
                </Button>
                <Button variant="contained" color="warning" style={{ margin: "10px" }} component={Link} to="/Features">
                    Explore Features
                </Button>
            </div>
        </div>
    </div>
    );
}

export default HeroSection;
