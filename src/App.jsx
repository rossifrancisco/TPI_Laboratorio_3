import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp'
import Rent from './components/rent/Rent';
import CreateAppartment from './components/createAppartment/CreateAppartment';
import CreateBuilding from './components/createBuilding/CreateBuilding';
import Private from './components/routes/Private';
import NotOwner from './components/routes/notOwner';
import Contact from './components/contact/Contact';
import { useState } from 'react';
import ApartmentCard from './components/apartment/ApartmentCard';
import UserCard from './components/user/UserCard';
import { useAuthContext } from './context/AuthContext';
import { useBuildingContext } from './context/BuildingContext';
import BuildingSelect from './components/buildingSelect/BuildingSelect';


function App() {

  //const [allAppartments, setAllAppartments] = useState([]);
  
  const { getAllAppartments, getAllBuildings } = useBuildingContext();

  const appartments =  getAllAppartments();
  const [Appartments, setAppartments] = useState(appartments); 

  const savePropertDataHandler = (enteredAppartmentData) => {
    const appartmentData = {
      ...enteredAppartmentData,
    };

    setAppartments((prevAppartments) => [appartmentData, ...prevAppartments]); 
  };

  const buildings = getAllBuildings();
  const [allBuildings, setAllBuildings] = useState(buildings);
  const saveBuildingDataHandler = (enteredBuildingData) => {
    const buildingData = {
      ...enteredBuildingData,
    };
    setAllBuildings((prevBuildings) => [buildingData, ...prevBuildings]);
  };

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/Login', element: <Login /> },
    { path: '/SignUp', element: <SignUp /> },
    { path: '/Contact', element: <Contact />},
    { path: '/Rent', element: (
      <Private>
        <Rent appartments={appartments} />
      </Private>
      ) 
    },
    {
      path: "/CreateAppartment",
      element: (
        <NotOwner>
          <CreateAppartment onAppartmentDataSaved={savePropertDataHandler} />
        </NotOwner>
      ),
    },
    {
      path: "/CreateBuilding",
      element: (
        <NotOwner>
          <CreateBuilding onBuildingDataSaved={saveBuildingDataHandler} />
        </NotOwner>
      ),
    },
    {
      path: "/BuildingSelect",
      element: (
        <notOwner>
          <BuildingSelect />
        </notOwner>
      ),
    },
    {
      path: "/ApartmentCard/:id",
      element: (
        <Private>
          <ApartmentCard properties={appartments} />
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

  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;