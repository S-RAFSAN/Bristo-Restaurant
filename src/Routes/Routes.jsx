import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/signup";
import PrivateRoute from "./PrivateRoutes";
import Secret from "../pages/Shared/Secret/secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: 'menu',
        element: <Menu></Menu>,
      },
      {
        path: 'order/:category',
        element: <Order></Order>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>,
      },
      {
        path: 'secret',
        element: <Secret></Secret>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      //user routes
      {
        path: 'cart',
        element: <Cart></Cart>,
      },

      //admin routes
      {
        path: 'addItems',  
        element: <AddItems></AddItems>,
      },
      {
        path: 'manageItems',
        element: <ManageItems></ManageItems>,
      },
      {
        path: 'updateItem/:id',
        element: <UpdateItem></UpdateItem>,
        loader: ({params}) => {
          const baseURL = import.meta.env.VITE_API_URL || 
            (import.meta.env.PROD ? "https://bistro-boss-server-virid-three.vercel.app" : "http://localhost:5000");
          return fetch(`${baseURL}/menu/${params.id}`);
        },
      },
      {
        path: 'users',
        element: <AllUsers></AllUsers>,

      }
    ],
  },
]);

export default router;
