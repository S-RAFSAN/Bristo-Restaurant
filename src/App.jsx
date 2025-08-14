import './App.css'
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <div className="max-w-7xl mx-auto">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </HelmetProvider>
  )
}

export default App
