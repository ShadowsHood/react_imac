import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from "./router/index.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Header /> */}
    <RouterProvider router={router} />
    {/* <Footer /> */}
  </StrictMode>,
)
