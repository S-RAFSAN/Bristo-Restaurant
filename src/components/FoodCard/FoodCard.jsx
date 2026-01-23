import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItem = currentCart.find(cartItem => cartItem.menuId === _id);
    
    if (existingItem) {
      // If item exists, increase quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // If item doesn't exist, add it
      const cartItem = {
        menuId: _id,
        price, 
        name,
        image,
        quantity: 1
      };
      currentCart.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    // Show success message
    Swal.fire({
      title: "Success!",
      text: `${name} added to cart successfully`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
    
    // Refresh cart
    refetch();
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
