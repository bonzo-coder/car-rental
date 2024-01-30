
import { Link, NavLink, useNavigate } from "react-router-dom"

export default function Header() {
    
    const activeStyles = {
        fontWeight: "bold",
        transform: "scale(1.2)",
        color: "#ABABAB"
    }
    const navigate = useNavigate();
    
    function fakeLogOut() {
        localStorage.removeItem("loggedin")
        navigate("/login")
    }
    
    
    
    return (
        <header>
            <Link className="site-logo fancy" 
                id="logo"
                
                to="/">
                <span>#</span>
                <span>C</span>
                <span>A</span>
                <span>R</span>
                <span>_</span>
                <span>4</span>
                <span>_</span>
                <span>R</span>
                <span>E</span>
                <span>N</span>
                <span>T</span>
                </Link>
            <nav>
                <NavLink 
                    to="host"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="about"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink 
                    to="cars"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Cars
                </NavLink>
                <Link to="login" className="login-link">
                <span className="material-symbols-outlined">
                    account_circle
                </span>
                </Link>
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
}