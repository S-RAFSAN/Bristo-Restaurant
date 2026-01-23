import useCart from "../../../hooks/useCart";
import {FaTrashAlt} from "react-icons/fa";
import Swal from "sweetalert2";

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    
    const handleDelete = (menuId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                // Remove item from localStorage
                const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
                const updatedCart = currentCart.filter(item => item.menuId !== menuId);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                
                // Dispatch event to notify other components (like NavBar)
                window.dispatchEvent(new CustomEvent('cartUpdated'));
                
                refetch();
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Item has been removed from cart.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
          });
    }
    return (
        <div>
        <div className="flex justify-evenly items-center">
            <h1 className='text-4xl'>Items: {cart.length}</h1>
            <h1 className='text-4xl'>Price: ${totalPrice.toFixed(2)}</h1>
            <button className="btn btn-primary">Pay</button> 
        </div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        cart.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </td>
          </tr>
        ) : (
          cart.map((item, index) => <tr key={item.menuId || item._id}>
            <th>
              {index + 1}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={item.image}
                      alt={item.name} />
                  </div>
                </div>
              </div>
            </td>
            <td>
              {item.name}
            </td>
            <td>
              ${item.price}
            </td>
            <td>
              {item.quantity || 1}
            </td>
            <th>
              <button
              onClick={() => handleDelete(item.menuId || item._id)}
              className="btn btn-ghost btn-xs btn-lg">
                <FaTrashAlt className="text-red-500"></FaTrashAlt>
              </button>
            </th>
          </tr>)
        )
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Cart;
