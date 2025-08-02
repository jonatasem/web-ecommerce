import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (itemToAdd) => {
        setCartItems((prevItems) => {
            // Create a more robust unique key that combines plate ID, options, addons, and a timestamp
            // This ensures that adding the same plate with different options/addons, or even multiple times with the same, gets a unique entry in the cart
            const optionsString = JSON.stringify(itemToAdd.options || []);
            const addonsString = JSON.stringify(itemToAdd.addons || []);
            
            // This unique key generation is crucial for the "key" warning and proper cart item management
            const newUniqueKey = `${itemToAdd._id}-${optionsString}-${addonsString}-${Date.now()}`;

            const newItem = {
                ...itemToAdd,
                quantity: 1,
                uniqueKey: newUniqueKey
            };
            return [...prevItems, newItem];
        });
    };

    const removeFromCart = (uniqueKeyToRemove) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.uniqueKey !== uniqueKeyToRemove));
    };

    const increaseQuantity = (uniqueKeyToUpdate) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.uniqueKey === uniqueKeyToUpdate
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        });
    };

    const decreaseQuantity = (uniqueKeyToUpdate) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.uniqueKey === uniqueKeyToUpdate
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            return updatedItems.filter((item) => item.quantity > 0); // Remove item if quantity drops to 0 or less
        });
    };

    const updateCartItems = (items) => {
        setCartItems(items);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{
            removeFromCart,
            addToCart,
            cartItems,
            updateCartItems,
            clearCart,
            increaseQuantity,
            decreaseQuantity
        }}>
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
