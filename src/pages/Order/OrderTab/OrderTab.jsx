import FoodCard from "../../../components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const OrderTab = ({ items }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No items available in this category.</p>
      </div>
    );
  }

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
         <div className="grid md:grid-cols-3 gap-10">
         {
          items.map(item =>  <FoodCard 
            key={item._id} 
            item={item}
            ></FoodCard>
          )
          }
         </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default OrderTab;
