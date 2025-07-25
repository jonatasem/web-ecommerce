import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (itemToAdd) => {
        setCartItems((prevItems) => {
            // Gerar um ID único para esta instância do item, incluindo variações.
            // É crucial que itemToAdd.options e itemToAdd.addons (ou suas variações)
            // sejam passados para addToCart.
            const optionsString = JSON.stringify(itemToAdd.options || []);
            const addonsString = JSON.stringify(itemToAdd.addons || []);
            const currentItemUniqueKey = `${itemToAdd._id}-${optionsString}-${addonsString}`;

            const existingItemIndex = prevItems.findIndex(
                (cartItem) => cartItem.uniqueKey === currentItemUniqueKey
            );

            if (existingItemIndex > -1) {
                // Item já no carrinho (com as mesmas variações), atualiza a quantidade
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1,
                };
                return updatedItems;
            } else {
                // Item não no carrinho ou com variações diferentes, adiciona um novo item
                // Adicione o uniqueKey ao novo item para fácil referência e remoção
                const newItem = {
                    ...itemToAdd,
                    quantity: 1,
                    uniqueKey: currentItemUniqueKey // A chave única que identifica esta variação
                };
                return [...prevItems, newItem];
            }
        });
    };

    const removeFromCart = (uniqueKeyToRemove) => { // Agora remove pelo uniqueKey
        const updatedCartItems = cartItems.filter((item) => item.uniqueKey !== uniqueKeyToRemove);
        setCartItems(updatedCartItems);
    };

    // Nova função para aumentar a quantidade de um item no carrinho
    const increaseQuantity = (uniqueKeyToUpdate) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) =>
                item.uniqueKey === uniqueKeyToUpdate
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        });
    };

    // Nova função para diminuir a quantidade de um item no carrinho
    const decreaseQuantity = (uniqueKeyToUpdate) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.uniqueKey === uniqueKeyToUpdate
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            // Remove o item se a quantidade for 0 ou menos
            return updatedItems.filter((item) => item.quantity > 0);
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
            increaseQuantity, // Adicionado ao contexto
            decreaseQuantity  // Adicionado ao contexto
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCartContext deve ser usado dentro de um CartProvider');
    }

    return context;
};