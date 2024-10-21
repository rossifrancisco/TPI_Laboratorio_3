import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import './Login.css'
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
    const { login, error, auth } = useAuthContext();
    const navigate = useNavigate(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();
        login({ username, password });
        console.log(username, password)
        if (auth.loggedIn) {
            navigate("/rent"); 
        }
        
    };

    //aca podemos hacer q si esta loggedIn, te muestre tus datos de usuario, y te deje cerrar sesion

    return (
        <>
            <Navbar />
            <div className="login-container">
                <h1 style={{ textAlign: "center", margin: "50px" }}>
                    Ingrese su cuenta
                </h1>
                <form onSubmit={onSubmitHandler} className="login">
                    <label className="field">
                        <p>Nombre de usuario:</p>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                        {error.username && <p className="error">{error.username}</p>}
                    </label>
                    <label className="field">
                        <p>Contraseña:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        {error.password && <p className="error">{error.password}</p>}
                    </label>
                    <button type="submit">Ingresar</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Login;