import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const URL = "https://localhost:7095/api/";
  const token = localStorage.getItem('token');

  const fetchData = async (endpoint, method = 'GET', body = null) => {
    try {
      const response = await fetch(URL + endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const data = {
    getAllUsers: (role) => fetchData(`${role}`),
    getUserById: (role, id) => fetchData(`${role}/getById/${id}`),
    createUser: (role, user) => fetchData(`${role}/create`, "POST", user),
    updateUser: (role, id, updatedUser) => fetchData(`${role}/update/${id}`, "PUT", updatedUser),
    deleteUser: (role, id) => fetchData(`${role}/delete/${id}`, "DELETE"),
  };

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
