import React, { useState, useEffect } from 'react'; // Remova useCallback se não for usar aqui
import './index.scss';

// Importações de componentes e hooks customizados
import platesServices from '../../services/plates'; // Caminho corrigido
import { useCartContext } from '../../contexts/useCartContext'; // Caminho corrigido
import PlateCard from '../../components/plateCard'; // Ajuste o caminho
import Notification from '../../components/notification'; // Ajuste o caminho
import Loading from '../../components/loading'; // Ajuste o caminho

// Imagens
import imgNotification from '../../assets/img/home/notification.png';
import imgHomeLogo from '../../assets/img/home/logo-home.png';

export default function HomePage() {
    // Desestrutura os estados e funções do seu serviço de pratos
    const {
        getAvailablePlates, // Função para buscar os pratos
        platesLoading,     // Indica se está carregando
        platesList,        // Lista de pratos
        platesError        // Objeto de erro
    } = platesServices();

    // Estado local para controlar o re-fetch dos pratos
    // Inicia como true para garantir o carregamento na montagem inicial
    const [shouldFetchPlates, setShouldFetchPlates] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const { addToCart } = useCartContext(); // Use o nome correto da função do contexto

    // Efeito para carregar os pratos quando o componente monta ou 'shouldFetchPlates' é true
    useEffect(() => {
        if (shouldFetchPlates) {
            getAvailablePlates(); // Chama a função do hook platesServices
            setShouldFetchPlates(false); // Reseta a flag para evitar re-fetches desnecessários
        }
    }, [shouldFetchPlates, getAvailablePlates]); // Depende de shouldFetchPlates e da função memoizada

    // Função para adicionar ao carrinho
    const handleAddToCart = (plate) => {
        addToCart(plate);
        setNotificationMessage(`${plate.title} adicionado ao carrinho!`);
        setNotificationType('success');
    };

    // Função para fechar a notificação
    const handleCloseNotification = () => {
        setNotificationMessage('');
        setNotificationType('');
    };

    const openPlatePopup = (plate) => {
        setSelectedPlate(plate);
    };

    return (
        <section className="container-home">
            <article className="home-plates">
                <div className="plates-head">
                    <img src={imgHomeLogo} alt="logotipo" className='logo-home' />
                    <input type="text" placeholder='Search Anything Here' />
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

                    {platesError && ( // Exibe mensagem de erro se houver
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
                            {platesList && platesList.length > 0 ? (
                                platesList.map((plateItem) => (
                                    <PlateCard
                                        key={plateItem._id}
                                        plateData={plateItem}
                                        onAddToCart={handleAddToCart}
                                        onOpenPopup={openPlatePopup}
                                    />
                                ))
                            ) : (
                                // Só mostra esta mensagem se não houver erro e a lista estiver vazia
                                !platesError && <p>Nenhum prato disponível no momento.</p>
                            )}
                        </div>
                    )}
                </div>
            </article>
            <article className="home-cart">
                <p>+</p>
                <p>Add Product</p>
                <p>From Special Menu</p>
            </article>
            {/* Você pode renderizar um PlatePopup aqui se tiver um */}
            {/* {selectedPlate && (
                <PlatePopup plate={selectedPlate} onClose={closePlatePopup} onAddToCart={handleAddToCart} />
            )} */}
        </section>
    );
}