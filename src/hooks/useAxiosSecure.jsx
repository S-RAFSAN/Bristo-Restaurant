import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', // Updated to Firebase backend URL
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