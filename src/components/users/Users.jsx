let Users = [
    {
        userName: "Admin",
        passWord: "1234",
        FirstName: "Administrador",
        lastName: "Admin",
        userId: 1,
        isAdmin: true,
    },
    {
        userName: "Facu",
        passWord: "1234",
        FirstName: "Facundo",
        lastName: "Solari",
        userId: 1,
        isAdmin: false,
    },
    
    {
        userName: "Fran",
        passWord: "1234",
        FirstName: "Francisco",
        lastName: "Rossi",
        userId: 1,
        isAdmin: false,
    },
    {
        userName: "Nico",
        passWord: "1234",
        FirstName: "Nicolas",
        lastName: "Garcia",
        userId: 1,
        isAdmin: false,
    },
    {
        userName: "Geral",
        passWord: "1234",
        FirstName: "Geraldine",
        lastName: "Martinez",
        userId: 1,
        isAdmin: false,
    },

];

export const addUser = (newUser) => {
    Users.push(newUser);
};

export const getUsers = () => Users;

export default Users;
