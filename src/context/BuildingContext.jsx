import { createContext, useContext } from "react";
import UpdateAppartment from "../components/updateAppartment/UpdateAppartment";

export const BuildingContext = createContext();

export const useBuildingContext = () => useContext(BuildingContext);

const BuildingContextProvider = ({ children }) => {
  const URL = "https://localhost:7095/api/";
  const getToken = () => localStorage.getItem("token");

  const getAllBuildings = async () => {
    try {
      const response = await fetch(URL + "Building", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getBuildingById = async (id) => {
    try {
      const response = await fetch(URL + `Building/getById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const createBuilding = async (building) => {
    try {
      const response = await fetch(URL + "Building/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(building),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateBuilding = async (id, updatedBuilding) => {
    try {
      const response = await fetch(URL + `Building/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedBuilding),
      });
      if (response.status === 204) return true;

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const deleteBuilding = async (id) => {
    try {
      const response = await fetch(URL + `Building/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getAllAppartments = async () => {
    try {
      const response = await fetch(`${URL}appartment/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al conseguir usuario");
      }

      const data = await response.json(); // respuesta de la API
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "Error al conectar con el servidor");
    }
  };

  const getAppartmentById = async (id) => {
    try {
      const response = await fetch(URL + `Appartment/getById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const createAppartment = async (building) => {
    try {
      const response = await fetch(URL + "Appartment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(building),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateAppartment = async (id, updatedAppartment) => {
    try {
      const response = await fetch(URL + `Appartment/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedAppartment),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const deleteAppartment = async (id) => {
    try {
      const response = await fetch(URL + `Appartment/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 204) return true;

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const reservation = async (id, request) => {
    try {
      const response = await fetch(URL + `Reservation/departamento/${id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(request),
      })
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }

  const rentAppartment = async (tenantId, appartmentId) => {
    try {
      const response = await fetch(URL + `Tenant/assignAppartment/${tenantId}/${appartmentId}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

      const data = await response.text();
      return data;
    }
    catch (error) {
      console.error(error);
      return null;
    }
  } 

  const data = {
    getAllBuildings,
    getBuildingById,
    createBuilding,
    updateBuilding,
    deleteBuilding,
    getAllAppartments,
    createAppartment,
    getAppartmentById,
    deleteAppartment,
    reservation,
    rentAppartment,
    updateAppartment,
  };

  return (
    <BuildingContext.Provider value={data}>
      {children}
    </BuildingContext.Provider>
  );
};

export default BuildingContextProvider;
