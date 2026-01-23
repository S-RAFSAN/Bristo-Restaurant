import axios from "axios";

// Use environment variable, or detect production and use production backend, or fallback to localhost
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    console.log('Using VITE_API_URL from env:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  // If deployed to Vercel (production), use production backend
  // import.meta.env.PROD is true when built for production
  if (import.meta.env.PROD) {
    const prodURL = "https://bistro-boss-server-virid-three.vercel.app";
    console.log('Production mode detected, using:', prodURL);
    return prodURL;
  }
  // For development, use localhost
  const devURL = "http://localhost:5000";
  console.log('Development mode, using:', devURL);
  return devURL;
};

const baseURL = getBaseURL();
console.log('Axios Public Base URL:', baseURL);

const axiosPublic = axios.create({
    baseURL: baseURL,
});

// Add request interceptor for debugging
axiosPublic.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosPublic.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    console.error('Error config:', error.config);
    console.error('Full URL attempted:', error.config?.baseURL + error.config?.url);
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error - Check if backend is running at:', error.config?.baseURL);
    }
    return Promise.reject(error);
  }
);

const useAxiosPublic = () => {    
    return axiosPublic;
};

export default useAxiosPublic;