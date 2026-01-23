import { useState, useEffect, useCallback } from 'react';

// Custom event name for cart updates
const CART_UPDATE_EVENT = 'cartUpdated';

const useCart = () => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage
    const loadCart = useCallback(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
        return savedCart;
    }, []);

    // Refetch function
    const refetch = useCallback(() => {
        loadCart();
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT));
    }, [loadCart]);

    // Load cart on mount
    useEffect(() => {
        loadCart();
    }, [loadCart]);

    // Listen for cart updates from other components
    useEffect(() => {
        const handleCartUpdate = () => {
            loadCart();
        };

        window.addEventListener(CART_UPDATE_EVENT, handleCartUpdate);
        
        // Also listen to storage events (for cross-tab updates)
        window.addEventListener('storage', handleCartUpdate);

        return () => {
            window.removeEventListener(CART_UPDATE_EVENT, handleCartUpdate);
            window.removeEventListener('storage', handleCartUpdate);
        };
    }, [loadCart]);

    return [cart, refetch];
};

export default useCart;