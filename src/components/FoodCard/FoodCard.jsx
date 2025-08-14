import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQueryClient } from '@tanstack/react-query';
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if(user && user.email){
      const cartItem = {
        menuId: _id,
        email: user.email,
        price, 
        name,
        image,
      }
      axiosSecure.post('/cart', cartItem)
      .then(res => {
        console.log(res.data);
        if(res.data.insertedId){
          // Invalidate cart cache to refresh the cart data
          queryClient.invalidateQueries(['cart']);
          Swal.fire({
            title: "Success!",
            text: `${name} added to cart successfully`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
          refetch();
        }
      })
      .catch(error => {
        console.log('Error adding to cart:', error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add item to cart. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        });
      })
    }
    else{
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state: {from: location}});
        }
      });
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
    <figure className="px-10 pt-10">
      <img
        src={image}
        alt=""
        className="rounded-xl" />
    </figure>
    <p className="absolute right-0 top-0 bg-slate-900 text-white px-4 py-1 rounded-bl-md mt-8 mr-8 text-xl">${price}</p>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{name}</h2>
      <p>{recipe}</p>
      <div className="card-actions">
        <button 
        onClick={handleAddToCart}
        className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  </div>
  );
};

export default FoodCard;
