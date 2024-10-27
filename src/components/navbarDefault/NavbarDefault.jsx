//import { Navbar } from "react-bootstrap";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const NavbarDefault = () => {
    const { auth } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">*LOGO*</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <a className="nav-link" href="/rent">Alquiler</a>
                        <a className="nav-link" href="/Contact">Contacto</a>
                        <a className="nav-link" href="/Login">Login</a>
                        <a className="nav-link" href="/SignUp">Sign Up</a>
                        {
                            auth.loggedIn && (
                                <a className="nav-link" href="/CreateProperty">Subir Inmueble</a>  
                            )
                               
                        }
                    </div>
                </div>
            </div>
        </nav>
        
    )
}

export default NavbarDefault;