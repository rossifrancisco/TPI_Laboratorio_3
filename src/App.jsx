import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp'
import Rent from './components/rent/Rent';
import CreateProperty from './components/property/CreateProperty';
import Private from './components/routes/Private';
import Contact from './components/contact/Contact';
import { useState } from 'react';
import Buildings from './components/buildings/Buildings';
import ApartmentCard from './components/apartment/ApartmentCard';

function App() {
  const [propertys, setPropertys] = useState(Buildings); 

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
        <Private>
          <CreateProperty onPropertyDataSaved={savePropertDataHandler} />
        </Private>
      ),
    },
    {
      path: "/ApartmentCard/:id",
      element: (
        <Private>
          <ApartmentCard properties={propertys} />
        </Private>
      ),
    }

  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;