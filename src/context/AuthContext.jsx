import { createContext, useContext, useState, useEffect } from "react"
import Users, { addUser } from '../components/users/Users'

export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

const getStoredUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(getStoredUsers());

    const getStoredAuth = () => JSON.parse(localStorage.getItem("auth")) || { 
        loggedIn: false, 
        userId: null,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        role: null,
    };
    const [auth, setAuth] = useState(getStoredAuth);
    const [error, setError] = useState({})

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    const login = ({ username, password }) => {
        setError({});

        const match = users.find((user) => user.userName === username)

        if (match) {
            if (match.passWord === password) {
                setAuth({
                    loggedIn: true,
                    userId: match.userId,
                    username: username,
                    mail: match.email, 
                    firstName: match.FirstName, 
                    lastName: match.lastName,
                    role: match.role,
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

    const addUser = (newUser) => {
        Users.push(newUser);
        localStorage.setItem("users", JSON.stringify(Users));
    };
    

    const register = (newUser) => {
        const match = users.find((user) => user.userName === newUser.userName);
        if (!match) {
            addUser(newUser);
            setUsers((prev) => [...prev, newUser]);
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
            lastName: null,
            role: null,
        })
        localStorage.removeItem("auth");
    }
            
         
    
    return (
        <AuthContext.Provider value={{auth, setAuth, error, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}
