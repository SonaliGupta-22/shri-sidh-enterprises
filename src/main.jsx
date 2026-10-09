import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'
import { RouterProvider } from './router.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </LangProvider>
  </React.StrictMode>
)
