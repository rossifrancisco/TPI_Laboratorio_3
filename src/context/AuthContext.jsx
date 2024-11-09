import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getToken());
  const URL = "https://localhost:7095/api/";

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

  const login = async ({ username, password }) => {
    try {
      const response = await fetch(`${URL}Authentication/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Credenciales incorrectas");
      }
  
      const data = await response.text(); // respuesta de la API
      setUser(data);
      localStorage.setItem("token", data);
  
      getData(data);
      
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "Error al conectar con el servidor");
    }
  };

  
  const register = async (newUser) => {
    try {
      const response = await fetch(`${URL}${newUser.role}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Credenciales incorrectas");
      }
      const data = await response.text(); // respuesta de la API
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "Error al conectar con el servidor");
    }
  };


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

  const getData = async (token) => {
    try {
      const response = await fetch(`${URL}User/getSelfUser`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al conseguir usuario");
      }
  
      const data = await response.json(); // respuesta de la API
      setAuth({
        loggedIn: true,
        userId: data.userId,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      });
      
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "Error al conectar con el servidor");
    }
  };

  const data = { login, auth, error, user, logout, register };
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};


////////////////


// Función para iniciar sesión
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${URL}Authentication/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Credenciales incorrectas");
    }

    return await response.json(); // respuesta api
  } catch (error) {
    throw new Error(error.message || "Error al conectar con el servidor");
  }
};


const register = async (newUser, endpoint) => {
  try {
    const response = await fetch(URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Error al registrar usuario");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error al conectar con el servidor");
  }
};

export const registerAdmin = (admin) => register(admin, "Admin/create");
export const registerOwner = (owner) => register(owner, "Owner/create");
export const registerTenant = (tenant) => register(tenant, "Tenant/create");

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem("auth");
};
