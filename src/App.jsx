import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp'
import Rent from './components/rent/Rent';
import CreateProperty from './components/property/CreateProperty';
import Private from './components/routes/Private';
import NotOwner from './components/routes/notOwner';
import Contact from './components/contact/Contact';
import { useState } from 'react';
import ApartmentCard from './components/apartment/ApartmentCard';
import UserCard from './components/user/UserCard';
import { useAuthContext } from './context/AuthContext';
import { useBuildingContext } from './context/BuildingContext';


function App() {

  const [allAppartments, setAllAppartments] = useState([]);
  
  const { getAllAppartments } = useBuildingContext();
  const appartments =  getAllAppartments();
  const [propertys, setPropertys] = useState(appartments); 

  const savePropertDataHandler = (enteredPropertyData) => {
    const propertyData = {
      ...enteredPropertyData,
    };

    setPropertys((prevProperties) => [propertyData, ...prevProperties]); 
  };

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/Login', element: <Login /> },
    { path: '/SignUp', element: <SignUp /> },
    { path: '/Contact', element: <Contact />},
    { path: '/Rent', element: (
      <Private>
        <Rent propertys={propertys} />
      </Private>
      ) 
    },
    {
      path: "/CreateProperty",
      element: (
        <NotOwner>
          <CreateProperty onPropertyDataSaved={savePropertDataHandler} />
        </NotOwner>
      ),
    },
    {
      path: "/ApartmentCard/:id",
      element: (
        <Private>
          <ApartmentCard properties={propertys} />
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