import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp'
import Rent from './components/rent/Rent';
import CreateProperty from './components/property/CreateProperty';
import Private from './components/routes/Private';
import Contact from './components/contact/Contact';
import { useState } from 'react';
import Buildings from './components/buildings/Buildings';

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
    { path: '/Rent', element: <Rent propertys={propertys} /> },
    { path: '/Contact', element: <Contact />},
    {
      path: "/CreateProperty",
      element: (
        <Private>
          <CreateProperty onPropertyDataSaved={savePropertDataHandler} />
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