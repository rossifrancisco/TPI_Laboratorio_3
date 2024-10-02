import { useState } from "react";
import users from "../user/user";



const SignUp = () => {

    const [SignUserName, setUserName] = useState('');
    const [SignPassword, setPassword] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const usersNames = users.reduce((AllUsers, user) => {
            AllUsers.append(user.userName)
            return AllUsers;
        }, []);
        
        if (SignUserName in usersNames.userName || SignUserName.trim() === '' || SignPassword.trim()=== '') {
            alert('Usuario inválido para registrarse');
        }
        else {
            alert('¡Usuario registrado correctamente!');
            setUserName("");
            setPassword("");
        }
        
    }
    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <label>Nombre de Usuario: 
                    <input type="text"
                    value={SignUserName}
                    onChange={(event) => setUserName(event.target.value)}>
                    </input>
                </label>
                <label>Contraseña: 
                    <input type="password"
                    value={SignPassword}
                    onChange={(event) => setPassword(event.target.value)}> 
                    </input>
                </label>
                <button type="submit"> Registrarse </button>
            </form>
        </div>
    )
};

export default SignUp;