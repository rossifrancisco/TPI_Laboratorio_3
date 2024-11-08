import React, { createContext, useState } from "react";
import { UserService } from "../services/UserServices";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWithLoading = async (fetchFunction, ...params) => {
    try {
      setLoading(true);
      const data = await fetchFunction(...params);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      return null;
    }
  };

  const data = {
    fetchWithLoading,
    getAllOwners: () => fetchWithLoading(UserService.getAllOwners),
    getOwnerById: (id) => fetchWithLoading(UserService.getOwnerById, id),
    createOwner: (owner) => fetchWithLoading(UserService.createOwner, owner),
    updateOwner: (id, updatedOwner) => fetchWithLoading(UserService.updateOwner, id, updatedOwner),
    deleteOwner: (id) => fetchWithLoading(UserService.deleteOwner, id),

    getAllTenants: () => fetchWithLoading(UserService.getAllTenants),
    getTenantById: (id) => fetchWithLoading(UserService.getTenantById, id),
    createTenant: (tenant) => fetchWithLoading(UserService.createTenant, tenant),
    updateTenant: (id, updatedTenant) => fetchWithLoading(UserService.updateTenant, id, updatedTenant),
    deleteTenant: (id) => fetchWithLoading(UserService.deleteTenant, id),

    getAllAdmins: () => fetchWithLoading(UserService.getAllAdmins),
    getAdminById: (id) => fetchWithLoading(UserService.getAdminById, id),
    createAdmin: (admin) => fetchWithLoading(UserService.createAdmin, admin),
    updateAdmin: (id, updatedAdmin) => fetchWithLoading(UserService.updateAdmin, id, updatedAdmin),
    deleteAdmin: (id) => fetchWithLoading(UserService.deleteAdmin, id),
  };

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
