import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp'
import Rent from './components/rent/Rent';
import CreateProperty from './components/property/CreateProperty';
import Private from './components/routes/Private';
import Contact from './components/contact/Contact';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/Login', element: <Login /> },
    { path: '/SignUp', element: <SignUp /> },
    { path: '/Rent', element: <Rent /> },
    { path: '/Contact', element: <Contact />},
    {
      path: "/CreateProperty",
      element: (
        <Private>
          <CreateProperty />
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