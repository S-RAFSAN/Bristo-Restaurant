import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

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

const axiosSecure = axios.create({
    baseURL: getBaseURL(),
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    
    useEffect(() => {
        // Request interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use(
            function(config) {
                const token = localStorage.getItem('access-token');  
                console.log('Request interceptor - Token:', token);
                console.log('Request URL:', config.url);
                config.headers.authorization = `Bearer ${token}`;
                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        const responseInterceptor = axiosSecure.interceptors.response.use(
            function(response) {
                return response;
            },
            async (error) => {
                const status = error.response?.status;
                // console.log('status error in interceptor', status);
                if (status === 401 || status === 403) {
                    await logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logout]);

    return axiosSecure;
};

export default useAxiosSecure;