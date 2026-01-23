import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name, category, price, recipe, _id} = useLoaderData();
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
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
        console.log(menuRes.data);
        if(menuRes.data.modifiedCount > 0){
            reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${data.name} updated successfully`,
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
            heading="Update Item" subHeading="Update Item Here"></SectionTitle>
                  <div className="max-w-md mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            Item Name<span className="text-red-500">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          defaultValue={name}
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
                            defaultValue={category}
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
                              defaultValue={price}
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
                            defaultValue={recipe}
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
                          Add Item Now
                        </button>
                      </div>
                    </form>
                  </div>
        </div>
    );
};

export default UpdateItem;