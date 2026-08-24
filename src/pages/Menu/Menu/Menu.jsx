import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg'
import PopularMenu from "../../Home/PopularMenu/PopularMenu";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCatagory from "../MenuCatagory/MenuCatagory";
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'

const Menu = () => {
  const [menu] = useMenu();
  const items = Array.isArray(menu) ? menu : [];
  const desserts = items.filter(item => item.category === 'dessert');
  const soup = items.filter(item => item.category === 'soup');
  const salad = items.filter(item => item.category === 'salad');
  const pizza = items.filter(item => item.category === 'pizza');
  const offered = items.filter(item => item.category === 'offered');

  return (
    <div>
      <Helmet>
        <title>FeastHub | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="Our Menu"></Cover>
      <SectionTitle subHeading="Don't miss" 
      heading="Today's Offer"></SectionTitle>
      <MenuCatagory items={offered}></MenuCatagory>
      <MenuCatagory items={desserts} title="Desserts" coverImg={dessertImg}></MenuCatagory>
      <MenuCatagory items={soup} title="Soup" coverImg={soupImg}></MenuCatagory>
      <MenuCatagory items={salad} title="Salad" coverImg={saladImg}></MenuCatagory>
      <MenuCatagory items={pizza} title="Pizza" coverImg={pizzaImg}></MenuCatagory>
      
    </div>
  );
};

export default Menu;
