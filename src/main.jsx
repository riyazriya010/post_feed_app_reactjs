import { createRoot } from 'react-dom/client'
import { AuthProvider } from './Authentication/User.jsx'
import App from './App.jsx'
// import './index.css'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
