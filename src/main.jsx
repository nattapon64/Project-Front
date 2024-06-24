import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/index.css'
import { AuthContextProvider } from './contexts/AuthContexts.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer/>
      <App />
    </AuthContextProvider>
  // </React.StrictMode>,
)
