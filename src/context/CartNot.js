import { useState, createContext } from "react";

// Create context for cart notifcation
const CartContext = createContext();

const CartProvider = ({ children }) => {
    // The data that gets stored in context
    !localStorage.getItem('cart') && localStorage.setItem('cart', JSON.stringify([]))
    const [ cartCounter, SetCartCounter] = useState({ index: JSON.parse(localStorage.getItem('cart')).length || 0});

    // Function to get the cart data if it exist
    const getCartData = () => {
        if(localStorage.getItem('cart')) {
            SetCartCounter({
                index: JSON.parse(localStorage.getItem('cart')).length
            });
        };
    };

    const clearCart = () => {
        SetCartCounter({
            index: 0
        })
        localStorage.clear();
        localStorage.setItem('cart', JSON.stringify([]));
    }

    return (
        <CartContext.Provider value={{ cartCounter, getCartData, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export {CartContext, CartProvider};