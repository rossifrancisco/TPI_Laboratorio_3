import { createContext } from "react";

export const BuildingContext = createContext();

const BuildingContextProvider = ({ children }) => {
  const URL = "https://localhost:7095/api/"; //aca hay q hacer desde la api .net
  const getToken = () => localStorage.getItem("token");

  const getAllBuildings = async () => {
    try {
      const response = await fetch(URL + "Building/GetAllBuildings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
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

  const getBuildingById = async (id) => {
    try {
      const response = await fetch(URL + `Building/GetBuildingById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
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
      const response = await fetch(URL + "Building/CreateBuilding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          accept: "*/*",
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
      const response = await fetch(URL + `Building/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          accept: "*/*",
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
      const response = await fetch(URL + `Building/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          accept: "*/*",
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

  const data = {
    getAllBuildings,
    getBuildingById,
    createBuilding,
    updateBuilding,
    deleteBuilding,
  };

  return (
    <BuildingContext.Provider value={data}>
      {children}
    </BuildingContext.Provider>
  );
};

export default BuildingContextProvider;
