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
      const res = await axiosPublic.get('/menu');
      return res.data;
    },
    retry: 1,
    retryDelay: 1000,
  });

  // Log errors for debugging
  if (error) {
    console.error('Menu fetch error:', error);
    console.error('API URL:', axiosPublic.defaults.baseURL);
  }

    return [menu, loading, refetch, error]

}

export default useMenu;