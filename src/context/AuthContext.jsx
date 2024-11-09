import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser, registerAdmin, registerOwner, registerTenant } from "../services/AuthService";
import { UserService } from "../services/UserServices";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

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
      const { user, token } = data;

      setAuth({
        loggedIn: true,
        userId: user.userId,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
        role: user.role,
        token,
      });
      localStorage.setItem("token", token); // Guarda el token en localStorage
    } catch (error) {
      setError({
        username: error.message || "Error en la autenticación",
      });
    }
  };

  const register = async (registerFn, newUser) => {
    try {
      await registerFn(newUser);
      return true;
    } catch (error) {
      setError({ username: error.message });
      return false;
    }
  };

  const registerAdmin = (newUser) => register(UserService.registerAdmin, newUser);
  const registerOwner = (newUser) => register(UserService.registerOwner, newUser);
  const registerTenant = (newUser) => register(UserService.registerTenant, newUser);

  const logout = () => {
    logoutUser();
    localStorage.removeItem("token");
    setAuth({
      loggedIn: false,
      userId: null,
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, error, login, logout, registerAdmin, registerOwner, registerTenant }}>
      {children}
    </AuthContext.Provider>
  );
};
