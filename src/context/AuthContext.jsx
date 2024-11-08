import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser} from "../services/AuthService";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const getStoredAuth = () => JSON.parse(localStorage.getItem("auth")) || { 
  loggedIn: false, 
  userId: null,
  username: null,
  email: null,
  firstName: null,
  lastName: null,
  role: null,
  token: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth);
  const [error, setError] = useState({});
  
  useEffect(() => {
    if (auth.loggedIn) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const login = async ({ username, password }) => {
    setError({});
    
    try {
      const data = await loginUser(username, password);
      const { user } = data;

      setAuth({
        loggedIn: true,
        userId: user.userId,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
    } catch (error) {
      setError({
        username: error.message || "Error en la autenticación",
      });
    }
  };

  const register = async (newUser) => {
    try {
      const data = await registerUser(newUser);
      return true;
    } catch (error) {
      setError({ username: error.message });
      return false;
    }
  };

  const logout = () => {
    logoutUser();
    setAuth({
      loggedIn: false,
      userId: null,
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
