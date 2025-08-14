import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  validateCaptcha,
  LoadCanvasTemplate,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [, setDisabled] = useState(true);
  const {signIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(5);
  }, []);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    
    signIn(email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "Login Successful!",
        text: `Welcome back, ${user.email}`,
        icon: "success",
        confirmButtonText: "Continue"
      });
      navigate(from, {replace: true});
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        title: "Login Failed!",
        text: error.message || "Please check your email and password",
        icon: "error",
        confirmButtonText: "Try Again"
      });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if(validateCaptcha(user_captcha_value)){
      setDisabled(false);
      Swal.fire({
        title: "Captcha Verified!",
        text: "You can now proceed to login",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    }else{
      setDisabled(true);
      Swal.fire({
        title: "Invalid Captcha!",
        text: "Please enter the correct captcha",
        icon: "error",
        confirmButtonText: "Try Again"
      });
    }
  };

  return (
    <>
    <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center w-full mb-8">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card w-full bg-base-100 max-w-sm shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <div className="form-control mt-6">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  className="input input-bordered mt-2 w-full"
                  placeholder="Enter the captcha"
                />
              </div>
              <div className="form-control mt-2">
                <input
                  className="btn btn-neutral mt-4 w-full"
                  type="submit"
                  value="Login"
                />
              </div>
            </fieldset>
          </form>
          <p className="text-center mb-8">Don't have an account? <Link to="/signup">Sign up</Link></p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
