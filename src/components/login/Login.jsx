import { useState } from "react"
import users from "../users/Users";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import './Login.css'

const Login = () => {

    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");

    const onSubmitHandler = () => {

        let encontrado = false;

        users.forEach(user => {
            if (user.userName === userName && user.passWord === passWord) {
                encontrado = true;
                return 
            }
        });

        if (encontrado) {
            alert("Bienvenido");
        } else {
            alert("usuario NO encontrado, Antes debe registrarse");
            setUserName("");
            setPassWord("");
        }
    }

    return (
        <>
            <Navbar />
            <div className="login-container">
                <h1 style={{textAlign: "center", margin: "50px"}}>Ingrese su cuenta</h1>
                <form onSubmit={onSubmitHandler} className="login">
                    <label className="field">
                        <p>Nombre de Usuario:</p>
                        <input 
                            type="text"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            required
                        />
                    </label>
                    <label className="field">
                        <p>Contraseña:</p>
                        <input 
                            type="password"
                            value={passWord}
                            onChange={(event) => setPassWord(event.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Ingresar</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Login;