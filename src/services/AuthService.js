const URL = "https://localhost:7095/api/";

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
