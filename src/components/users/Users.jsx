let Users = [
    {
        userName: "Admin",
        passWord: "1234",
        FirstName: "Administrador",
        lastName: "Admin",
        userId: 1,
        isAdmin: true,
    },
];

export const addUser = (newUser) => {
    Users.push(newUser);
};

export const getUsers = () => Users;

export default Users;
