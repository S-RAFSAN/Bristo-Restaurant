// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  //   const [menu, setMenu] = useState([]);
  //   const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("https://bistro-boss-server-virid-three.vercel.app/menu")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenu(data)
  //       setLoading(false)
  //   })
  // }, [])      
  
  const { data: menu = [], isPending: loading, refetch, error } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      try {
        console.log('Fetching menu from:', axiosPublic.defaults.baseURL + '/menu');
        const res = await axiosPublic.get('/menu');
        console.log('Menu data received:', res.data);
        if (!Array.isArray(res.data)) {
          throw new Error(res.data?.error || 'Menu API did not return a list');
        }
        return res.data;
      } catch (err) {
        console.error('Error in useMenu queryFn:', err);
        console.error('Full error details:', {
          message: err.message,
          code: err.code,
          response: err.response,
          config: err.config,
          baseURL: axiosPublic.defaults.baseURL
        });
        throw err;
      }
    },
    retry: 1,
    retryDelay: 1000,
  });

  // Log errors for debugging
  if (error) {
    console.error('Menu fetch error:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('API Base URL:', axiosPublic.defaults.baseURL);
    console.error('Full URL attempted:', axiosPublic.defaults.baseURL + '/menu');
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }

    return [menu, loading, refetch, error]

}

export default useMenu;