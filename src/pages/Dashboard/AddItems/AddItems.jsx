import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an image url
    const imageFile = {image: data.image[0]};
    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res.data.success){
      //now send the item & image url to the server
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
        }

        const menuRes = await axiosSecure.post('/menu', menuItem);
        console.log(menuRes.data);
        if(menuRes.data.insertedId){
            reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${data.name} added successfully`,
                showConfirmButton: false,
                timer: 1500
            });
            
        }
    }
    // console.log(res.data);
    reset();
  };

  return (
    <div>
      <SectionTitle
        heading="Add Items"
        subHeading="What's New!!"
      ></SectionTitle>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Item Name<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter item name"
            />
          </div>

          <div className="flex gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            <div className="max-w-md mx-auto">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Price<span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter item price"
                />
              </div>
            </div>
          </div>

          <div>
            <fieldset className="fieldset">
              <label className="label">
                <span className="label-text text-lg">Recipe</span>
              </label>
              <textarea
                {...register("recipe")}
                className="textarea textarea-bordered w-full h-24"
                placeholder="Enter item details"
              ></textarea>
            </fieldset>
          </div>

          <div className="form-control w-full max-w-xs">
            <input {...register("image", { required: true })} type="file" className="file-input file-input-ghost" />
          </div>

          <div className="flex justify-center mt-6">
            <button type="submit" className="btn btn-primary    btn-wide text-lg">
              Add Item <FaUtensils className="ml-2"></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
