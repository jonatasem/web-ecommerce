import React, { useEffect, useState } from 'react'; // Adicionado useState para notificações
import './index.scss'; // Certifique-se de que este arquivo CSS existe para estilização
import { useAuthContext } from '../../contexts/useAuthContext'; // Para obter o ID do usuário
import orderServices from '../../hooks/useOrders'; // Para buscar as ordens
import Loading from '../../components/loading'; // Para mostrar o estado de carregamento
import Notification from '../../components/notification'; // Para mostrar erros

export default function OrdersPage() {
    const { currentUser, isAuthenticated } = useAuthContext();
    const { getUserOrders, ordersList, orderLoading, ordersError } = orderServices();

    // Estado local para gerenciar a exibição da notificação de erro
    const [showNotification, setShowNotification] = useState(false);

    // Efeito para carregar as ordens quando o componente é montado ou o usuário muda
    useEffect(() => {
        // Verifica se o usuário está autenticado e se currentUser._id existe antes de buscar as ordens
        if (isAuthenticated && currentUser?._id) {
            getUserOrders(currentUser._id);
        } else if (!isAuthenticated) {
            // Se não estiver autenticado, pode-se limpar a lista de ordens ou mostrar uma mensagem
            // console.log("Usuário não autenticado, não buscando ordens.");
            // setOrdersList([]); // Se você tivesse um setOrdersList disponível aqui
        }
    }, [isAuthenticated, currentUser, getUserOrders]); // Adicionado getUserOrders como dependência

    // Efeito para mostrar/esconder a notificação de erro
    useEffect(() => {
        if (ordersError) {
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
    }, [ordersError]);

    // Função para fechar a notificação
    const handleCloseNotification = () => {
        setShowNotification(false);
        // Opcional: Você pode querer resetar o estado de erro no hook orderServices aqui
        // se o hook expuser uma função para isso, por exemplo: orderServices.clearError();
    };

    // Renderiza o estado de carregamento
    if (orderLoading) {
        return (
            <section className="orders-page loading-state">
                <Loading />
                <p>Carregando suas ordens...</p>
            </section>
        );
    }

    // Renderiza o estado de erro
    // A notificação será mostrada se houver um erro e showNotification for true
    if (ordersError && showNotification) {
        return (
            <section className="orders-page error-state">
                <Notification
                    message={`Erro ao carregar ordens: ${ordersError.message || 'Ocorreu um erro desconhecido.'}`}
                    type="error"
                    onClose={handleCloseNotification}
                />
                <p>Não foi possível carregar suas ordens no momento. Por favor, tente novamente mais tarde.</p>
            </section>
        );
    }

    // Renderiza quando não há ordens ou o usuário não está autenticado
    if (!isAuthenticated || !ordersList || ordersList.length === 0) {
        return (
            <section className="orders-page empty-state">
                <h1>Minhas Ordens</h1>
                <p>Você ainda não fez nenhum pedido ou não está logado.</p>
                <p>Explore nosso <a href="/">menu especial</a> e faça sua primeira ordem!</p>
            </section>
        );
    }

    // Renderiza a lista de ordens
    return (
        <section className="orders-page">
            <h1>Minhas Ordens</h1>
            <div className="orders-list">
                {ordersList.map((order) => (
                    // Adicionado optional chaining e fallback para propriedades da ordem
                    <div key={order?._id}>
                        <p><strong>Total:</strong> R$ {(order?.total || 0).toFixed(2)}</p>
                        <div className="order-items">
                            <h4>Itens:</h4>
                            <ul>
                                {(!order?.items || order.items.length === 0) && (
                                    <li>Nenhum item nesta ordem.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}