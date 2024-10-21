import { createContext, useContext, useState } from "react"
import Users, { addUser } from '../components/users/Users'

    
export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        loggedIn: false,
        userId: null,

    })

    const [error, setError] = useState({})

    const login = (values) => {
        const {username, password} = values;
        setError({});

        const match = Users.find((user) => user.userName === username)

        if (match) {
            if (match.passWord === password) {
                setAuth({
                    loggedIn: true,
                    userId: match.userId
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
        return false;
    };

    const logout = () => {
        setAuth({
            loggedIn: false,
            userId: null
        })
    }
            
         
    
    return (
        <AuthContext.Provider value={{auth, error, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}
    
 