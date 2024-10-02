import { Navbar } from "react-bootstrap";

const NavbarDefault = () => {

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">*LOGO*</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <a class="nav-link" href="#">ALQUILER</a>
                        <a class="nav-link" href="#">CONTACTO</a>
                        <a class="nav-link" href="#">LOGIN</a>
                        <a class="nav-link" href="#">SIGN UP</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarDefault;