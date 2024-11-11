import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp'
import Rent from './components/rent/Rent';
import CreateAppartment from './components/createAppartment/CreateAppartment';
import CreateBuilding from './components/createBuilding/CreateBuilding';
import Private from './components/routes/Private';
import NotOwner from './components/routes/NotOwner';
import Owner from './components/routes/Owner';
import Contact from './components/contact/Contact';
import { useState } from 'react';
import AppartmentCard from './components/appartmentCard/AppartmentCard';
import UserCard from './components/user/UserCard';
import { useAuthContext } from './context/AuthContext';
import { useBuildingContext } from './context/BuildingContext';
import BuildingSelect from './components/buildingSelect/BuildingSelect';
import OwnProperties from './components/ownProperties/ownProperties';
import AppartmentSelect from './components/appartmentSelect/AppartmentSelect';
import UpdateAppartment from './components/updateAppartment/UpdateAppartment';
import UpdateBuilding from './components/UpdateBuilding/UpdateBuilding';
import AdminPanel from './components/adminPanel/adminPanel';


function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/Login', element: <Login /> },
    { path: '/SignUp', element: <SignUp /> },
    { path: '/Contact', element: <Contact /> },
    {
      path: '/Rent', element: (
        <Private>
          <Rent  />
        </Private>
      )
    },
    {
      path: "/CreateAppartment/:buildingId",
      element: (
        <NotOwner>
          <CreateAppartment  />
        </NotOwner>
      ),
    },
    {
      path: "/UpdateAppartment/:appartmentId",
      element: (
        <NotOwner>
          <UpdateAppartment />
        </NotOwner>
      ),
    },
    {
      path: "/CreateBuilding",
      element: (
        <NotOwner>
          <CreateBuilding />
        </NotOwner>
      ),
    },
    {
      path: "/UpdateBuilding/:buildingId",
      element: (
        <NotOwner>
          <UpdateBuilding />
        </NotOwner>
      ),
    },
    {
      path: "/BuildingSelect",
      element: (
        <NotOwner>
          <BuildingSelect />
        </NotOwner>
      ),
    },
    {
      path: "/AppartmentSelect",
      element: (
        <NotOwner>
          <AppartmentSelect />
        </NotOwner>
      ),
    },
    {
      path: "/AppartmentCard/:id",
      element: (
        <Private>
          <AppartmentCard  />
        </Private>
      ),
    },
    {
      path: "/user",
      element: (
        <Private>
          <UserCard />
        </Private>
      ),
    },
    {
      path: '/OwnProperties',
      element: (
        <NotOwner>
          <OwnProperties />
        </NotOwner>
      )
    },
    {
      path: '/AdminPanel',
      element: (
        <NotOwner>
          <AdminPanel />
        </NotOwner>
      )
    },
    

  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;