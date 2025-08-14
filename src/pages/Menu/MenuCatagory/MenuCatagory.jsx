import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCatagory = ({items, title, coverImg}) => {
    // Get the category from the first item to ensure we have the correct lowercase category
    const category = items.length > 0 ? items[0].category : '';
    
    return (
        <div className="my-10">
             {title && < Cover img={coverImg} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 my-10">
                {
                    items.map(item => <MenuItem 
                        key={item._id} 
                        item={item}
                        ></MenuItem>)
                }
            </div>
            <Link to={`/order/${category}`}>
                <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
            </Link>
        </div>
    )

}

export default MenuCatagory;