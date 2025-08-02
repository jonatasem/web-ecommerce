import { useState, useEffect } from 'react';
import './index.scss';

import platesServices from '../../hooks/usePlates';
import orderServices from '../../hooks/useOrders'; // Importa o hook de ordens
import { useCartContext } from '../../contexts/useCartContext';
import { useAuthContext } from '../../contexts/useAuthContext'; // Importa o AuthContext

import PlateCard from '../../components/plateCard';
import Notification from '../../components/notification';
import Loading from '../../components/loading';

import imgNotification from '../../assets/img/home/notification.png';
import imgHomeLogo from '../../assets/img/home/logo-home.png';

export default function HomePage() {
    const {
        getAvailablePlates,
        platesLoading,
        platesList,
        platesError
    } = platesServices();

    const { sendOrder, orderLoading } = orderServices(); // Obtém a função sendOrder e o estado de carregamento
    const { currentUser, isAuthenticated } = useAuthContext(); // Obtém o usuário logado e o status de autenticação

    const [shouldFetchPlates, setShouldFetchPlates] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const { addToCart, cartItems, increaseQuantity, decreaseQuantity, clearCart } = useCartContext(); // Adicionado clearCart
    const [searchTerm, setSearchTerm] = useState('');

    // Effect to load available plates
    useEffect(() => {
        if (shouldFetchPlates) {
            getAvailablePlates();
            setShouldFetchPlates(false);
        }
    }, [shouldFetchPlates, getAvailablePlates]);

    // Handles adding a plate to the cart
    const handleAddToCart = (plate) => {
        addToCart(plate);
        setNotificationMessage(`${plate.title} adicionado ao carrinho!`);
        setNotificationType('success');
    };

    // Closes notifications
    const handleCloseNotification = () => {
        setNotificationMessage('');
        setNotificationType('');
    };

    // Filters plates based on the search term
    const filteredPlates = platesList.filter(plate =>
        plate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plate.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Nova função para finalizar o pedido ---
    const handlePlaceOrder = async () => {
        if (!isAuthenticated || !currentUser?._id) { // Verifica se o usuário está logado e tem um ID
            setNotificationMessage('Você precisa estar logado para fazer um pedido!');
            setNotificationType('warning');
            return;
        }

        if (cartItems.length === 0) {
            setNotificationMessage('Seu carrinho está vazio. Adicione itens antes de fazer um pedido.');
            setNotificationType('warning');
            return;
        }

        const orderTotal = cartItems.reduce((total, item) => total + (item.sale * item.quantity), 0);

        const orderPayload = {
            userId: currentUser._id, // PEGA O ID DO USUÁRIO AQUI!
            items: cartItems.map(item => ({
                plateId: item._id,
                quantity: item.quantity,
                price: item.sale,
                // Inclua outras propriedades do item que seu backend espera
                options: item.options || [],
                addons: item.addons || []
            })),
            total: orderTotal,
            status: 'Pendente' // Status inicial do pedido
        };

        try {
            await sendOrder(orderPayload);
            setNotificationMessage('Pedido realizado com sucesso!');
            setNotificationType('success');
            clearCart(); // Limpa o carrinho após o pedido ser enviado com sucesso
        } catch (error) {
            setNotificationMessage(`Falha ao realizar pedido: ${error.message}`);
            setNotificationType('error');
            console.error('Erro ao enviar pedido:', error);
        }
    };
    // --- Fim da nova função ---

    return (
        <section className="container-home">
            <article className="home-plates">
                <div className="plates-head">
                    <img src={imgHomeLogo} alt="logotipo" className='logo-home' />
                    <input
                        type="text"
                        placeholder='Search Anything Here'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="icon">
                        <img src={imgNotification} alt="ícone de notificação" className='icon-notification'/>
                    </div>
                </div>
                <div className="menu">
                    <h2>Special Menu For You</h2>
                    {notificationMessage && (
                        <Notification
                            message={notificationMessage}
                            type={notificationType}
                            onClose={handleCloseNotification}
                        />
                    )}

                    {platesError && (
                        <Notification
                            message={`Erro ao carregar pratos: ${platesError.message}`}
                            type="error"
                            onClose={handleCloseNotification}
                        />
                    )}

                    {platesLoading ? (
                        <Loading />
                    ) : (
                        <div className="plates-list">
                            {filteredPlates && filteredPlates.length > 0 ? (
                                filteredPlates.map((plateItem) => (
                                    <PlateCard
                                        key={plateItem._id}
                                        plateData={plateItem}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))
                            ) : (
                                !platesError && <p>Nenhum prato disponível no momento.</p>
                            )}
                        </div>
                    )}
                </div>
            </article>
            <article className="home-cart">
                <div className="cart-header">
                    {cartItems.length === 0 && (
                        <div className="cart-empty">
                            <p>+</p>
                            <p>Add Product</p>
                            <p>From Special Menu</p>
                        </div>
                    )}
                </div>
                <div className="cart-list">
                    {cartItems.map((item) => (
                        <div key={item.uniqueKey} className="cart-item">
                            <div className="cart-details">
                                <img src={item.imgUrl || item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.title}</h4>
                                    <h5>R$ {(item.sale * item.quantity).toFixed(2)}</h5>
                                </div>
                            </div>
                            <div className="item-quantity">
                                <button onClick={() => decreaseQuantity(item.uniqueKey)}>-</button>
                                <p>{item.quantity} </p>
                                <button onClick={() => increaseQuantity(item.uniqueKey)}>+</button>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-total">
                        <h4>Total: R$ {cartItems.reduce((total, item) => total + (item.sale * item.quantity), 0).toFixed(2)}</h4>
                        {/* Botão para finalizar o pedido */}
                        <button
                            className="checkout-button"
                            onClick={handlePlaceOrder}
                            disabled={orderLoading || !isAuthenticated || cartItems.length === 0}
                        >
                            {orderLoading ? 'Enviando Pedido...' : 'Place Order'}
                        </button>
                    </div>
                )}
            </article>
        </section>
    );
}