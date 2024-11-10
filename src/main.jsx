import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import BuildingContextProvider from './context/BuildingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BuildingContextProvider>
        <App />
      </BuildingContextProvider>
    </AuthProvider>
  </StrictMode>,
)
