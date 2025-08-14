import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
    return (
        <div className="featured-item pt-4 my-20">
            <SectionTitle 
            heading="Featured Item" subHeading="From Our Menu">
            </SectionTitle>
           <div className="md:flex justify-between items-center py-20 px-16 bg-black bg-opacity-30 ">
             <div>
                <img className="h-[400px] " src={featuredImg} alt="" />
            </div>
            <div className="md:ml-10 ">
                <p>01 January,2000</p>
                <p className="uppercase">Where can I get some?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <button className="btn btn-dash border-0 border-b-4 btn-lg">Order Now</button>
            </div>
           </div>
        </div>
    );
};

export default Featured;