import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (itemToAdd) => {
        setCartItems((prevItems) => {
            const uniqueKey = `${itemToAdd._id}-${JSON.stringify(itemToAdd.options || [])}-${JSON.stringify(itemToAdd.addons || [])}`;
            const existingItemIndex = prevItems.findIndex(item => item.uniqueKey.startsWith(uniqueKey));

            if (existingItemIndex > -1) {
                return prevItems.map((item, index) => 
                    index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // CORREÇÃO: Removendo as crases para criar um objeto real
                const newItem = { ...itemToAdd, quantity: 1, uniqueKey: `${uniqueKey}-${Date.now()}` }; 
                return [...prevItems, newItem];
            }
        });
    };

    const removeFromCart = (uniqueKeyToRemove) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.uniqueKey !== uniqueKeyToRemove));
    };

    const increaseQuantity = (uniqueKeyToUpdate) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.uniqueKey === uniqueKeyToUpdate ? { ...item, quantity: item.quantity + 1 } : item
            );
        });
    };

    const decreaseQuantity = (uniqueKeyToUpdate) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.uniqueKey === uniqueKeyToUpdate ? { ...item, quantity: item.quantity - 1 } : item
            );
            return updatedItems.filter((item) => item.quantity > 0);
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const contextValue = useMemo(() => ({
        removeFromCart,
        addToCart,
        cartItems,
        clearCart,
        increaseQuantity,
        decreaseQuantity
    }), [cartItems]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};