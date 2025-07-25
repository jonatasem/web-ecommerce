import React, { useState, useEffect } from 'react';
import './index.scss';

import platesServices from '../../hooks/usePlates';
import { useCartContext } from '../../contexts/useCartContext';
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

    const [shouldFetchPlates, setShouldFetchPlates] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const { addToCart, cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCartContext(); // Adicionado increaseQuantity e decreaseQuantity
    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca

    // Efeito para carregar os pratos disponíveis
    useEffect(() => {
        if (shouldFetchPlates) {
            getAvailablePlates();
            setShouldFetchPlates(false);
        }
    }, [shouldFetchPlates, getAvailablePlates]);

    // Lida com a adição de um prato ao carrinho
    const handleAddToCart = (plate) => {
        addToCart(plate);
        setNotificationMessage(`${plate.title} adicionado ao carrinho!`);
        setNotificationType('success');
    };

    // Lida com a remoção de um item do carrinho
    // Esta função agora recebe o uniqueKey para remoção, se você tiver um botão de "remover item específico"
    const handleRemoveFromCart = (uniqueKey) => {
        removeFromCart(uniqueKey);
        setNotificationMessage('Item removido do carrinho.');
        setNotificationType('info');
    };

    // Fecha as notificações
    const handleCloseNotification = () => {
        setNotificationMessage('');
        setNotificationType('');
    };

    // Filtra os pratos com base no termo de busca
    const filteredPlates = platesList.filter(plate =>
        plate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plate.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        <img src={imgNotification} alt="ícone de notificação" />
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
                                        // A prop onOpenPopup não é mais necessária aqui
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
                <div className="cart-items-list">
                    {cartItems.map((item) => (
                        <div key={item.uniqueKey} className="cart-item"> {/* Alterado para item.uniqueKey */}
                            <img src={item.imgUrl || item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h4>{item.title}</h4>
                                {/* Assumindo que 'sale' é o preço do item */}
                                <h5>R$ {(item.sale * item.quantity).toFixed(2)}</h5> {/* Preço total do item */}
                            </div>
                            <div className="item-quantity">
                                <button onClick={() => increaseQuantity(item.uniqueKey)}>+</button> {/* Botão de Aumentar */}
                                {item.quantity} {/* Exibe a quantidade atual do item */}
                                <button onClick={() => decreaseQuantity(item.uniqueKey)}>-</button> {/* Botão de Diminuir */}
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-total">
                        <h4>Total: R$ {cartItems.reduce((total, item) => total + (item.sale * item.quantity), 0).toFixed(2)}</h4>
                        <button className="checkout-button">Place Order</button>
                    </div>
                )}
            </article>
        </section>
    );
}
