import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (itemToAdd) => {
        setCartItems((prevItems) => {
            // Gerar um ID único para esta instância do item, incluindo variações.
            // Se você quiser que diferentes instâncias do mesmo prato sejam separadas,
            // mesmo sem opções/addons, você precisa de um uniqueKey que mude a cada adição.

            // Remova a lógica de existingItemIndex se você deseja que cada clique adicione um novo item.
            // Se você quer que o mesmo prato com as mesmas opções/addons seja agrupado,
            // mas um clique em "adicionar" sem opções extras gere um item separado,
            // a lógica precisaria ser mais complexa ou você usaria um uniqueKey sempre novo.

            // Cenário atual: Cada clique em "Add Product" deve adicionar uma NOVA linha no carrinho,
            // mesmo que o prato base seja o mesmo.
            // Para isso, precisamos de um uniqueKey que seja sempre diferente.

            const optionsString = JSON.stringify(itemToAdd.options || []);
            const addonsString = JSON.stringify(itemToAdd.addons || []);
            
            // Gerar um uniqueKey sempre novo para cada adição.
            // Isso garantirá que cada clique em "Add Product" crie uma nova entrada no carrinho.
            const newUniqueKey = `${itemToAdd._id}-${optionsString}-${addonsString}-${Date.now()}`;

            const newItem = {
                ...itemToAdd,
                quantity: 1, // Sempre começa com 1 para um novo item
                uniqueKey: newUniqueKey // A chave única que identifica esta variação/instância
            };
            return [...prevItems, newItem];
        });
    };

    const removeFromCart = (uniqueKeyToRemove) => {
        const updatedCartItems = cartItems.filter((item) => item.uniqueKey !== uniqueKeyToRemove);
        setCartItems(updatedCartItems);
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
        throw new Error('useCartContext deve ser usado dentro de um CartProvider');
    }

    return context;
};