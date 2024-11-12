//import { Navbar } from "react-bootstrap";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const NavbarDefault = () => {
    const { auth } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">RENTAR</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        
                        {!auth.loggedIn ? (
                            <>
                                <a className="nav-link" href="/">INICIO</a>
                                <a className="nav-link" href="/Contact">CONTACTO</a>
                                <a className="nav-link" href="/Login">LOGIN</a>
                                <a className="nav-link" href="/SignUp">SIGN UP</a>
                            </>
                        ) : (
                            <>
                                <a className="nav-link" href="/" style={{alignContent: "center"}} >INICIO</a>
                                <a className="nav-link" href="/Contact" style={{alignContent: "center"}} >CONTACTO</a>
                               
                                {auth.role === 'Owner' && (
                                    <>
                                        <a className="nav-link" href="/CreateBuilding" style={{alignContent: "center"}} >CREAR EDIFICIO</a>
                                        <a className="nav-link" href="/BuildingSelect" style={{alignContent: "center"}} >CREAR DEPARTAMENTO</a>
                                    </>
                                )}
                                {auth.role === 'Tenant' && (
                                    <a className="nav-link" href="/Rent" style={{alignContent: "center"}} >ALQUILER</a>
                                )}
                                <a className="nav-link" href="/User"><img className='image' src={auth.photo} alt="foto de perfil" style={{ width: "50px", borderRadius: "50%" }}/></a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
        
    )
}

export default NavbarDefault;