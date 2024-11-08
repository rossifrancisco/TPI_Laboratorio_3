const URL = "https://localhost:7095/api/";

// Función para iniciar sesión
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${URL}/login`, {
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


export const registerUser = async (newUser) => {
  try {
    const response = await fetch(`${URL}/registro`, {
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

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem("auth");
};
