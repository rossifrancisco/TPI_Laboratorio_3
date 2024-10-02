import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/login/Login';


function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;