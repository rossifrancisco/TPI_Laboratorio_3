// import { createContext } from "react";

// export const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   const URL = "https://localhost/api/"; // URL base de la API
//   const getToken = () => localStorage.getItem("token");

//   const getAllOwners = async () => {
//     try {
//       const response = await fetch(URL + "Owner", {
//         method: "GET",
//         headers: { "Content-Type": "application/json", accept: "*/*" },
//       });
//       if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       return await response.json();
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };

//   const getOwnerById = async (id) => {
//     try {
//       const response = await fetch(URL + `Owner/${id}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json", accept: "*/*" },
//       });
//       if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       return await response.json();
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };

//   const createOwner = async (owner) => {
//     try {
//       const response = await fetch(URL + "Owner", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//         body: JSON.stringify(owner),
//       });
//       if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       return await response.json();
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };

//   const updateOwner = async (id, updatedOwner) => {
//     try {
//       const response = await fetch(URL + `Owner/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//         body: JSON.stringify(updatedOwner),
//       });
//       if (response.status === 204) return true;
//       return await response.json();
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };

//   const deleteOwner = async (id) => {
//     try {
//       const response = await fetch(URL + `Owner/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//       });
//       if (response.status === 204) return true;
//       return await response.json();
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };

//   // CRUD para Tenant
//     const getAllTenants = async () => { 
//         try {
//             const response = await fetch(URL + "Tenant", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     accept: "*/*"
//                 },
//             })
//             if(!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };

//     const getTenantById = async (id) => { 
//         try {
//             const response = await fetch(URL + `Tenant/${id}`, {
//                 method: "GET",
//                 headers: { 
//                     "Content-Type": "application/json", 
//                     accept: "*/*" 
//                 },
//             });
//             if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };

//     const createTenant = async (tenant) => { 
//         try {
//             const response = await fetch(URL + "Tenant", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${getToken()}`,
//                 },
//                 body: JSON.stringify(tenant),
//             });
//             if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };
//     const updateTenant = async (id, updatedTenant) => { 
//         try {
//             const response = await fetch(URL + `Tenant/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${getToken()}`,
//                 },
//                 body: JSON.stringify(updatedTenant),
//             });
//             if (response.status === 204) return true;
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };

//     const deleteTenant = async (id) => { 
//         try {
//             const response = await fetch(URL + `Tenant/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${getToken()}`,
//                 },
//             });
//             if (response.status === 204) return true;
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };

//   // CRUD para Admin
//     const getAllAdmins = async () => {
//         try {
//             const response = await fetch(URL + "Admin", {
//               method: "GET",
//               headers: { "Content-Type": "application/json", accept: "*/*" },
//             });
//             if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };

//     const getAdminById = async (id) => { 
//         try {
//             const response = await fetch(URL + `Admin/${id}`, {
//               method: "GET",
//               headers: { "Content-Type": "application/json", accept: "*/*" },
//             });
//             if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };

//     const createAdmin = async (admin) => {
//         try {
//             const response = await fetch(URL + "Admin", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${getToken()}`,
//                 },
//                 body: JSON.stringify(admin),
//             });
//             if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };

//     const updateAdmin = async (id, updatedAdmin) => {
//         try {
//             const response = await fetch(URL + `Admin/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${getToken()}`,
//             },
//             body: JSON.stringify(updatedAdmin),
//             });
//             if (response.status === 204) return true;
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };

//     const deleteAdmin = async (id) => {
//         try {
//             const response = await fetch(URL + `Admin/${id}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${getToken()}`,
//             },
//             });
//             if (response.status === 204) return true;
//             return await response.json();
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     };

//   const data = {
//     getAllOwners, getOwnerById, createOwner, updateOwner, deleteOwner,
//     getAllTenants, getTenantById, createTenant, updateTenant, deleteTenant,
//     getAllAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin,
//   };

//   return (
//     <UserContext.Provider value={data}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContextProvider;
