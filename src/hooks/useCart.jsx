
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const{ data: cart = [], refetch} = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            console.log('Fetching cart for user:', user?.email);
            const res = await axiosSecure.get(`/cart?email=${user?.email}`);
            console.log('Cart data received:', res.data);
            // Filter by email on frontend as backup in case backend doesn't filter properly
            const filteredCart = res.data.filter(item => item.email === user?.email);
            console.log('Filtered cart data:', filteredCart);
            return filteredCart;
        },
        enabled: !!user?.email,
        staleTime: 0, // Always fetch fresh data
        cacheTime: 0,  // Don't cache the data
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
    return [cart, refetch];
};

export default useCart;