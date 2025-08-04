
import { useState, useEffect } from 'react';
import './index.scss';

import usePlatesServices from '../../hooks/usePlates';
import useOrderServices from '../../hooks/useOrders';
import { useCartContext } from '../../contexts/useCartContext';
import { useAuthContext } from '../../contexts/useAuthContext';
import { useNotifications } from '../../hooks/useNotification';

import PlateCard from '../../components/plateComponent';
import Notification from '../../components/notificationComponent';
import Loading from '../../components/loadingComponent';
import imgHomeLogo from '../../assets/img/home/logo-home.png';

export default function HomePage() {
    const { getAvailablePlates, platesLoading, platesList, platesError } = usePlatesServices();
    const { sendOrder, orderLoading } = useOrderServices();
    const { currentUser, isAuthenticated } = useAuthContext();
    const { addToCart, cartItems, increaseQuantity, decreaseQuantity, clearCart } = useCartContext();
    const { notificationMessage, notificationType, showNotification, hideNotification } = useNotifications();
    const [shouldFetchPlates, setShouldFetchPlates] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (shouldFetchPlates) {
            getAvailablePlates();
            setShouldFetchPlates(false);
        }
    }, [shouldFetchPlates, getAvailablePlates]);

    useEffect(() => {
        if (platesError) {
            showNotification(`Erro ao carregar pratos: ${platesError.message}, 'error'`);
        }
    }, [platesError, showNotification]);

    const handleAddToCart = (plate) => {
        addToCart(plate);
        showNotification(`${plate.title} adicionado ao carrinho!, 'success'`);
    };

    const filteredPlates = platesList.filter(plate =>
        plate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plate.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePlaceOrder = async () => {
        if (!isAuthenticated || !currentUser?._id) {
            showNotification('Você precisa estar logado para fazer um pedido!', 'warning');
            return;
        }

        if (cartItems.length === 0) {
            showNotification('Seu carrinho está vazio. Adicione itens antes de fazer um pedido.', 'warning');
            return;
        }

        const orderTotal = cartItems.reduce((total, item) => total + (item.sale * item.quantity), 0);
        const orderPayload = {
            userId: currentUser._id,
            items: cartItems.map(item => ({
                plateId: item._id,
                quantity: item.quantity,
                price: item.sale,
                options: item.options || [],
                addons: item.addons || []
            })),
            total: orderTotal,
            status: 'Pendente'
        };

        try {
            const response = await sendOrder(orderPayload);
            if(response.success) {
                showNotification('Pedido realizado com sucesso!', 'success');
                clearCart();
            } else {
                showNotification(response.message, 'error');
            }
        } catch (error) {
            showNotification(`Falha ao realizar pedido: ${error.message}, 'error'`);
            console.error('Erro ao enviar pedido:', error);
        }
    };

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
                    <div className="icon"></div>
                </div>
                <div className="menu">
                    <h2>Special Menu For You</h2>
                    {notificationMessage && (
                        <Notification
                            message={notificationMessage}
                            type={notificationType}
                            onClose={hideNotification}
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