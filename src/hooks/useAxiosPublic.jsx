import axios from "axios";

// Use environment variable, or detect production and use production backend, or fallback to localhost
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // If deployed to Vercel (production), use production backend
  // import.meta.env.PROD is true when built for production
  if (import.meta.env.PROD) {
    return "https://bistro-boss-server-virid-three.vercel.app";
  }
  // For development, use localhost
  return "http://localhost:5000";
};

const axiosPublic = axios.create({
    baseURL: getBaseURL(),
});

const useAxiosPublic = () => {    
    return axiosPublic;
};

export default useAxiosPublic;