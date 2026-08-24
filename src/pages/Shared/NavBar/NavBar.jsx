import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/dessert">Order</Link>
      </li>
      <li>
        <Link to="/secret">Secret</Link>
      </li>
      <li>
        <Link to="/dashboard/cart" className="flex items-center gap-2">
          <FaShoppingCart className="text-base" />
          {cart.length > 0 && (
            <div className="badge badge-sm badge-secondary">+{cart.length}</div>
          )}
        </Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar fixed z-10 max-w-7xl mx-auto bg-black bg-opacity-30 text-white shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost hover:bg-transparent text-xl font-bold">
            FeastHub
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-sm md:btn-md rounded-full border border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-black"
            >
              <FaSignOutAlt />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm md:btn-md rounded-full border-0 bg-amber-500 px-6 font-semibold text-black hover:bg-amber-400"
            >
              <FaUser />
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
