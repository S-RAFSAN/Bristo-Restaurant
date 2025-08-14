import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaPhone, FaShoppingCart, FaStar, FaStore, FaUser, FaUtensils } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            <div className='w-64 min-h-screen bg-orange-500'>
            <ul className="menu p-4">
                {
                    isAdmin ? <>
                    <li>
                    <NavLink to="/dashboard/adminHome">
                    <FaHome></FaHome>
                    Admin Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/addItems">
                    <FaUtensils></FaUtensils>
                    Add Items
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/manageItems">
                    <FaList></FaList>
                    Manage Items
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/bookings">
                    <FaBook></FaBook>
                    Mannage Bookings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/users">
                    <FaUser></FaUser>
                    All users
                    </NavLink>
                </li>
                    </>
                    : <>
                    <li>
                    <NavLink to="/dashboard/userHome">
                    <FaHome></FaHome>
                    User Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/reservation">
                    <FaCalendar></FaCalendar>
                    Reservation
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/cart">
                    <FaShoppingCart></FaShoppingCart>
                    My Cart ({cart.length})
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/review">
                    <FaStar></FaStar>
                    Add a Review
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/booking">
                    <FaBook></FaBook>
                    My Booking
                    </NavLink>
                </li>
                    </>
                }
                <div className="divider"></div>
                <li>
                    <NavLink to="/">
                    <FcHome></FcHome>
                     Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/order/salad">
                    <FaList></FaList>
                     Menu
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                    <FaStore></FaStore>
                     Shop
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                    <FaPhone></FaPhone>
                     Contact
                    </NavLink>
                </li>
            </ul>
            </div>
            <div className='flex-1 p-10'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;