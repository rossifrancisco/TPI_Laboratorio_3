//import { Navbar } from "react-bootstrap";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavbarDefault = () => {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">*LOGO*</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <a className="nav-link" href="/rent">ALQUILER</a>
                        <a className="nav-link" href="#">CONTACTO</a>
                        <a className="nav-link" href="/Login">LOGIN</a>
                        <a className="nav-link" href="/SignUp">SIGN UP</a>
                    </div>
                </div>
            </div>
        </nav>
        
    )
}

export default NavbarDefault;