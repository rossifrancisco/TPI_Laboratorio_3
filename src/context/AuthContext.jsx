import { createContext, useContext, useState, useEffect } from "react"
import Users, { addUser } from '../components/users/Users'

    
export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const getStoredAuth = () => JSON.parse(localStorage.getItem("auth")) || { 
        loggedIn: false, 
        userId: null,
        username: null,
        email: null,
        firstName: null,
        lastName: null
    };
    const [auth, setAuth] = useState(getStoredAuth);
    const [error, setError] = useState({})

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    const login = ({ username, password }) => {
        setError({});

        const match = Users.find((user) => user.userName === username)

        if (match) {
            if (match.passWord === password) {
                setAuth({
                    loggedIn: true,
                    userId: match.userId,
                    username: username,
                    mail: match.email, // Agregar email
                    firstName: match.FirstName, // Agregar nombre
                    lastName: match.lastName // Agregar apellido
                })
            } else {
                setError({
                    password: "Password incorrecto"
                })
            }
        } else {
            setError({
                username: "Usuario no encontrado"
            })
        }

    }

    const register = (newUser) => {
        const match = Users.find((user) => user.userName === newUser.userName); 
        if (!match) {
            addUser(newUser); 
            return true; 
        }
        setError({ username: "Usuario ya existe" });
        return false;
    };

    const logout = () => {
        setAuth({
            loggedIn: false,
            userId: null,
            username: null,
            email: null,
            firstName: null,
            lastName: null
        })
        localStorage.removeItem("auth");
    }
            
         
    
    return (
        <AuthContext.Provider value={{auth, error, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}
