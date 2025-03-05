import { Link } from 'react-router-dom';
import logo from '../assets/Logo4.png';
import background from '../assets/meditate2.jpg'

function Home() {
    return (
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
                         <img src={logo} style={{height:"80px", borderRadius:"50%", padding:"5px", margin:"5px",marginLeft:"30px"}}/>
                    </div>
            <div className="container d-flex flex-column align-items-center">
                    
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-4" style={{ fontSize: "20px"}}>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Meditations">Meditations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Journal">Journal</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Community">Community</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login/Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div style={{border:"1px solid black", height:"400px", alignItems:"center", display:"flex", flexDirection: "column", justifyContent:"center"}}>
            <h1 style={{color:"white"}}>"Find Peace in the Digital World"</h1>
            <div style={{ marginTop: "20px" }}>
                <button style={{
                    backgroundColor: "#FFA500",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "16px",
                    margin: "10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>Start Meditating</button>
                <button style={{
                    backgroundColor: "#FFA500",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "16px",
                    margin: "10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>Explore Features</button>
            </div>
        </div>
        </div>
    );
}

export default Home;

