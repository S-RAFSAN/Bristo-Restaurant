import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetch('https://bistro-boss-server-virid-three.vercel.app/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="my-12">
      <SectionTitle
        heading="Testimonials"
        subHeading="From Our Customer"
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper h-[400px]">
        
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center justify-center m-24">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="text-center my-4">{review.details}</p>
              <h4 className="text-2xl font-bold">{review.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

  export default Testimonials;
