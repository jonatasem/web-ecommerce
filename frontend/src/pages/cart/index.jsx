import { useState } from "react";
import { useCartContext } from "../../contexts/useCartContext";
import { LuMinusCircle } from 'react-icons/lu';
import ConfirmOrderPopup from "../../components/confirmOrderPopup";
import orderServices from "../../services/order";
import './index.scss';
import Notification from "../../components/notification"; // Importa o componente de notificação
import { Link } from "react-router-dom";
import imgCart from '../../assets/img/cart/cart-empty.png';

export default function Cart() {
    const { cartItems, updateCartItems, removeFromCart, clearCart } = useCartContext(); // Contexto do carrinho
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false); // Estado do popup de confirmação
    const { sendOrder } = orderServices(); // Serviço para gerenciar pedidos
    const [notification, setNotification] = useState(""); // Estado para a notificação

    // Função para alterar a quantidade de itens no carrinho
    const handleChangeItemQty = (mode, itemId) => {
        const updatedCartItem = cartItems.map((item) => {
            if (item._id === itemId) {
                if (mode === 'less' && item.quantity > 1) {
                    item.quantity -= 1; // Reduz a quantidade
                } else if (mode === 'more') {
                    item.quantity += 1; // Aumenta a quantidade
                }
            }
            return item; // Retorna o item atualizado
        });

        updateCartItems(updatedCartItem); // Atualiza o contexto do carrinho
    };

    // Função para abrir ou fechar o popup de confirmação
    const handleOpenPopup = (e) => {
        e.preventDefault();
        setConfirmPopupOpen(!confirmPopupOpen);
    };

    // Função para confirmar o pedido
    const handleConfirmOrder = (orderData) => {
        orderData.items = cartItems.map((item) => {
            return { plateId: item._id, quantity: item.quantity }; // Mapeia os itens do carrinho para o formato esperado
        });
        sendOrder(orderData); // Envia o pedido
        setConfirmPopupOpen(!confirmPopupOpen); // Fecha o popup
        clearCart(); // Limpa o carrinho
    };

    // Função para remover um item do carrinho
    const handleRemoveFromCart = (itemId, itemName) => {
        removeFromCart(itemId); // Remove o item do carrinho
        setNotification(`${itemName} removido do carrinho!`); // Define a mensagem da notificação
    };

    if (!cartItems.length) {
        return (
            <section className="cart-empty-container">
                <img src={imgCart} alt="imagem do carrinho vazio" />
                <h1>Seu carrinho está vazio... :/</h1>
                <p>Adicione algum item e tente novamente!</p>
                <button>
                    <Link to="/">
                        Voltar para a loja
                    </Link>
                </button>
            </section>
        );
    }

    return (
        <section className="container-cart">
            <div>
                <h1 className="title-cart">Seus itens:</h1>
                <div className="cart-main">
                    {cartItems.map((item) => (
                        <article key={item._id}>
                            <div>
                                <div className="layout-cart-item">
                                    <img src={item.imgUrl} alt="" />
                                    <div>
                                        <h2>{item.name}</h2>
                                        <p className="ingredient-item">[{String(item.ingredients)}]</p>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                <div className="container-less-more">
                                    <p>Porções: </p>
                                    <p>{item.quantity}</p>
                                    <div>
                                        <button onClick={() => { handleChangeItemQty('less', item._id); }}>-</button>
                                        <button onClick={() => { handleChangeItemQty('more', item._id); }}>+</button>
                                    </div>
                                </div>
                                <div className="container-remove-cart">
                                    <button onClick={() => { handleRemoveFromCart(item._id, item.name); }}><LuMinusCircle className="icon"/> Remove item</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <button className="btn-finally" onClick={handleOpenPopup}>Confirmar compra!</button>
            </div>

            <ConfirmOrderPopup open={confirmPopupOpen} onClose={handleOpenPopup} onConfirm={handleConfirmOrder} />

            {/* Exibe a notificação se houver uma mensagem */}
            <Notification message={notification} onClose={() => setNotification("")} />
        </section>
    );
}