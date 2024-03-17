import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import { RouterProvider } from 'react-router-dom'
import {router} from "./router.jsx"
import { UserProvider } from "./Components/UserProvider.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
    </React.StrictMode>
)
