import { useState } from "react"
import users from "../user/user";

const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");

const Login = () => {

    const ButtonClick = () => {
        users.forEach(user => {
            if (user.userName === userName && user.password === password) {
                // token de aca wacho
            }});
    }

    return (
        <div>
            <label>
                Nombre de Usuario:
                <input 
                    type="text"
                    value={userName}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <label>
                Contraseña:
                <input 
                    type="text"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <button onClick={ButtonClick}>Ingresar</button>
        </div>
    )
}

export default Login;