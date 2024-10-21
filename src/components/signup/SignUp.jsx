import { useState } from "react";
import { addUser, getUsers } from "../users/Users";
import Navbar from '../navbarDefault/NavbarDefault';
import Footer from '../footer/Footer'
import './SignUp.css';
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const {register} = useAuthContext();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    

    const onSubmitHandler = () => {
        event.preventDefault();

        const newUser = {
            userName: userName,
            passWord: passWord,
            FirstName: firstName,
            lastName: lastName,
            userId: getUsers().length + 1,
            isAdmin: false,
        };

        const success = register(newUser); 

        if (success) {
            alert('¡Usuario registrado correctamente!');
            setFirstName('');
            setLastName('');
            setUserName('');
            setPassWord('');
            navigate("/Appartment") //deberia redirigirte a crear el inmuebele!
        } else {
            alert('El nombre de usuario ya está en uso, elija otro.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="signup-container">
                <h1 style={{textAlign: "center", margin: "50px"}}>Ingrese sus datos</h1>
                <form onSubmit={onSubmitHandler} className="signup">
                    <label>
                        <p>Nombre:</p> 
                        <input type="text"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            required
                        /> 
                    </label>
                    <label>
                        <p>Apellido: </p>
                        <input type="text"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            required
                        /> 
                    </label>
                    <label>
                        <p>Nombre de Usuario: </p>
                        <input type="text"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <p>Contraseña: </p>
                        <input type="password"
                            value={passWord}
                            onChange={(event) => setPassWord(event.target.value)}
                            required
                        /> 
                    </label>
                    <button type="submit"> Registrarse </button>
                </form>
            </div>
            <Footer />
        </>
    )
};

export default SignUp;
