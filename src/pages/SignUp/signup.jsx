import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {createUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result => {
      const loggedUser = result.user;
      
      // Update the user's display name
      updateProfile(loggedUser, {
        displayName: data.name
      })
      .then(() => {
        const userInfo = {
          name: data.name,
          email: data.email
        }
        axiosPublic .post("/users", userInfo)
        .then(res => {
          if(res.data.insertedId){
            console.log('User created successfully');
            Swal.fire({
              title: "Account Created Successfully!",
              text: `Welcome ${data.name}! You can now log in.`,
              icon: "success",
              confirmButtonText: "Continue"
            });
            navigate("/");
          }
        })
        
        
      })
      .catch(error => {
        console.log("Error updating profile:", error);
        Swal.fire({
          title: "Account Created Successfully!",
          text: `Welcome ${data.name}! You can now log in.`,
          icon: "success",
          confirmButtonText: "Continue"
        });
        navigate("/");
      });
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Sign Up Failed!",
        text: error.message || "Please try again with different credentials",
        icon: "error",
        confirmButtonText: "Try Again"
      });
    })
  };
  return (
    <>
      <Helmet>
        <title>FeastHub | Sign up</title>
      </Helmet>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col">
            <div className="text-center w-full mb-8">
              <h1 className="text-5xl font-bold">Sign up now!</h1>
            </div>
            <div className="card w-full max-w-sm bg-base-100 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <fieldset className="fieldset">
                  <div className="form-control mb-2">
                    <input
                      type="text"
                      name="name"
                      {...register("name", { required: true })}
                      className="input input-bordered w-full"
                      placeholder="Name"
                    />
                    {errors.name && (
                      <span className="text-red-400 text-sm mt-1 block">
                        Name is required
                      </span>
                    )}
                  </div>
                  <div className="form-control mb-2">
                    <input
                      type="email"
                      name="email"
                      {...register("email", { required: true })}
                      className="input input-bordered w-full"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-sm mt-1 block">
                        Email is required
                      </span>
                    )}
                  </div>
                  <div className="form-control mb-2">
                    <input
                      type="password"
                      name="password"
                                             {...register("password", {
                         required: true,
                         minLength: 8,
                         maxLength: 20,
                         pattern: {
                           value:
                             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                           message:
                             "Must contain at least one uppercase,lowercase,number, special character",
                         },
                       })}
                      className="input input-bordered w-full"
                      placeholder="Password"
                    />
                    {errors.password && errors.password.type === "pattern" && (
                      <span className="text-red-400 text-sm mt-1 block">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password && errors.password.type === "required" && (
                      <span className="text-red-400 text-sm mt-1 block">
                        Password is required
                      </span>
                    )}
                                         {errors.password &&
                       errors.password.type === "minLength" && (
                         <span className="text-red-400 text-sm mt-1 block">
                           Must be at least 8 characters
                         </span>
                       )}
                    {errors.password &&
                      errors.password.type === "maxLength" && (
                        <span className="text-red-400 text-sm mt-1 block">
                          Must be less than 20 characters
                        </span>
                      )}
                  </div>
                  <div className="form-control mb-2">
                    <input
                      type="password"
                      name="confirmPassword"
                                             {...register("confirmPassword", {
                         required: true,
                         minLength: 8,
                         maxLength: 20,
                         pattern: {
                           value:
                             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                           message:
                             "Must contain at least one uppercase,lowercase,number, special character",
                         },
                       })}
                      className="input input-bordered w-full"
                      placeholder="Confirm Password"
                    />
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "pattern" && (
                        <span className="text-red-400 text-sm mt-1 block">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "required" && (
                        <span className="text-red-400 text-sm mt-1 block">
                          Confirm Password is required
                        </span>
                      )}
                                         {errors.confirmPassword &&
                       errors.confirmPassword.type === "minLength" && (
                         <span className="text-red-400 text-sm mt-1 block">
                           Must be at least 8 characters
                         </span>
                       )}
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "maxLength" && (
                        <span className="text-red-400 text-sm mt-1 block">
                          Must be less than 20 characters
                        </span>
                      )}
                  </div>

                  <div className="form-control">
                    <input
                      className="btn btn-neutral mt-4 w-full"
                      type="submit"
                      value="Sign up"
                    />
                  </div>
                </fieldset>
              </form>
              <p className="text-center mb-8">Already have an account? <Link to="/login">Login</Link></p>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default SignUp;
