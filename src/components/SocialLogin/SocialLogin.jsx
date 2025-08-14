import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useLocation } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                };
                // Fire-and-forget save; do not block navigation
                axiosPublic.post("/users", userInfo).catch((err) => {
                    console.log("Failed to save user:", err);
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log("Google sign-in failed:", error);
            });
    };
    return (
        <div className="text-center p-8 ">
            <div className="divider">Or</div>

            <div>               
                <button onClick={handleGoogleSignIn} className="btn btn-outline">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;