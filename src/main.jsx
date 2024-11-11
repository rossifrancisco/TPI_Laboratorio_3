import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import BuildingContextProvider from './context/BuildingContext.jsx'
import UserContextProvider from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BuildingContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </BuildingContextProvider>
    </AuthProvider>
  </StrictMode>,
)
