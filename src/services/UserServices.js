const URL = "https://localhost:7095/api/";

const getToken = () => localStorage.getItem("token");

const fetchData = async (endpoint, method = 'GET', body = null) => {
  try {
    const response = await fetch(URL + endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
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

const getAllOwners = () => fetchData("Owner");
const getOwnerById = (id) => fetchData(`Owner/getById/${id}`);
const createOwner = (owner) => fetchData("Owner/create", "POST", owner);
const updateOwner = (id, updatedOwner) => fetchData(`Owner/update/${id}`, "PUT", updatedOwner);
const deleteOwner = (id) => fetchData(`Owner/delete/${id}`, "DELETE");

const getAllTenants = () => fetchData("Tenant");
const getTenantById = (id) => fetchData(`Tenant/getById/${id}`);
const createTenant = (tenant) => fetchData("Tenant/create", "POST", tenant);
const updateTenant = (id, updatedTenant) => fetchData(`Tenant/update/${id}`, "PUT", updatedTenant);
const deleteTenant = (id) => fetchData(`Tenant/delete/${id}`, "DELETE");

const getAllAdmins = () => fetchData("Admin");
const getAdminById = (id) => fetchData(`Admin/getById/${id}`);
const createAdmin = (admin) => fetchData("Admin/create", "POST", admin);
const updateAdmin = (id, updatedAdmin) => fetchData(`Admin/update/${id}`, "PUT", updatedAdmin);
const deleteAdmin = (id) => fetchData(`Admin/delete/${id}`, "DELETE");

export const UserService = {
  getAllOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner,

  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
  
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
