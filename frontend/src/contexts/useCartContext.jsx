import { createContext, useContext, useState } from "react";

// Criação do contexto para o carrinho
const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]); // Estado para armazenar os itens do carrinho

    // Função para adicionar um item ao carrinho
    const addToCart = (itemToAdd) => {
        const checkItemAlready = cartItems.find((cartItem) => {
            return cartItem._id === itemToAdd._id; // Verifica se o item já está no carrinho
        });

        if (!checkItemAlready) {
            itemToAdd.quantity = 1; // Define a quantidade inicial como 1
            setCartItems([...cartItems, itemToAdd]); // Adiciona o novo item ao carrinho
            console.log('Item added correctly');
        } else {
            console.log('Item is already on cart');
        }
    };

    // Função para remover um item do carrinho
    const removeFromCart = (itemId) => {
        const cartItemsSanitized = cartItems.filter((item) => {
            return item._id !== itemId; // Filtra o item a ser removido
        });
        
        setCartItems(cartItemsSanitized); // Atualiza o estado do carrinho
    };

    // Função para atualizar os itens do carrinho
    const updateCartItems = (items) => {
        setCartItems(items);
    };

    // Função para limpar o carrinho
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ removeFromCart, addToCart, cartItems, updateCartItems, clearCart }}>
            {children} 
        </CartContext.Provider>
    );
}

// Hook para acessar o contexto do carrinho
export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        console.log('You are out of CartContext');
    }

    return context; // Retorna o contexto
};