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
    password: null,
    email: null,
    firstName: null,
    lastName: null,
    photo: null,
    role: null,
  };
  const [auth, setAuth] = useState(getStoredAuth);
  const [error, setError] = useState({});

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
  
      getData(data, password); // Obtener datos del usuario y guardar contraseña ingresada
      
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
      password: null,
      email: null,
      firstName: null,
      lastName: null,
      photo: null,
      role: null,
      token: null,
    });
  };

  const getData = async (token, password) => {
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
        password: password, // Guardar la contraseña ingresada
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        photo: data.photo,
        role: data.role,
      });
      
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "Error al conectar con el servidor");
    }
  };

  const data = { login, auth, setAuth, error, user, logout, register, updateUserProfile };
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};


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
    console.log(URL)
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

const updateUserProfile = async (user, endpoint) => {
  const updatedData = {
    username: user.username,
    password: user.password,
    email: user.email,
    name: user.firstName,
    lastname: user.lastName,
    photo: user.photo
  };

  const token = localStorage.getItem("token");
  console.log("Datos del usuario que se enviarán:", updatedData);
  console.log(token);

  try {
    const BASE_URL = "https://localhost:7095";
    const fullUrl = `${BASE_URL}${endpoint}`;
    const response = await fetch(BASE_URL + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data.message || 'Error al actualizar el perfil');
    }
    return true;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    throw new Error(error.message || 'Error al conectar con el servidor');
  }
};


export const registerAdmin = (admin) => register(admin, "Admin/create");
export const registerOwner = (owner) => register(owner, "Owner/create");
export const registerTenant = (tenant) => register(tenant, "Tenant/create");
export const updateAdminProfile = (admin) => updateUserProfile(admin, `Admin/update/${admin.id}`);
export const updateTenantProfile = (tenant) => updateUserProfile(tenant, `Tenant/update/${tenant.id}`);
export const updateOwnerProfile = (owner) => updateUserProfile(owner, `Owner/update/${owner.id}`);

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem("auth");
};
