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
        element: <PrivateRoute><Secret></Secret></PrivateRoute>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      //user routes
      {
        path: 'cart',
        element: <Cart></Cart>,
      },

      //admin routes
      {
        path: 'addItems',  
        element: <AdminRoutes><AddItems></AddItems></AdminRoutes>,
      },
      {
        path: 'users',
        element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>,

      }
    ],
  },
]);

export default router;
