import { useEffect, useState } from 'react';
import './index.scss';
import { useAuthContext } from '../../contexts/useAuthContext';
import useOrderServices from '../../hooks/useOrders';
import LoadingComponent from '../../components/loadingComponent';
import NotificationComponent from '../../components/notificationComponent';

export default function OrdersPage() {
    const { currentUser, isAuthenticated } = useAuthContext();
    const { getUserOrders, ordersList, orderLoading, ordersError, deleteOrder, updateOrder } = useOrderServices();
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success');
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (isAuthenticated && currentUser?._id) {
            getUserOrders(currentUser._id);
        }
    }, [isAuthenticated, currentUser, getUserOrders]);

    const showMessage = (message, type) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const handleChangeStatus = async (orderId, newStatus) => {
        const result = await updateOrder(orderId, { status: newStatus });
        if (result.success) {
            showMessage('Status do pedido atualizado com sucesso!', 'success');
        } else {
            showMessage(result.message, 'error');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
            const result = await deleteOrder(orderId);
            if (result.success) {
                showMessage('Pedido excluído com sucesso!', 'success');
            } else {
                showMessage(result.message, 'error');
            }
        }
    };
    
    const handleEditOrder = (orderId) => {
        showMessage('Funcionalidade de edição em desenvolvimento.', 'info');
    };

    if (orderLoading) {
        return (
            <section className="orders-page loading-state">
                <LoadingComponent />
                <p>Carregando suas ordens...</p>
            </section>
        );
    }

    if (!isAuthenticated || !ordersList || ordersList.length === 0) {
        return (
            <section className="orders-page empty-state">
                <h1>Minhas Ordens</h1>
                <p>Você ainda não fez nenhum pedido ou não está logado.</p>
                <p>Explore nosso <a href="/">menu especial</a> e faça sua primeira ordem!</p>
            </section>
        );
    }

    return (
        <section className="orders-page">
            <h1>Minhas Ordens</h1>
            {showNotification && (
                <NotificationComponent
                    message={notificationMessage}
                    type={notificationType}
                    onClose={handleCloseNotification}
                />
            )}
            <div className="orders-list">
                {ordersList.map((order) => (
                    <div key={order?._id} className="order-card">
                        <p><strong>ID do Pedido:</strong> {order?._id}</p>
                        <p><strong>Total:</strong> R$ {(order?.total || 0).toFixed(2)}</p>
                        <p><strong>Status:</strong> {order?.status || 'Não especificado'}</p>
                        <div className="order-items">
                            <h4>Itens:</h4>
                            <ul>
                                {order?.items && order.items.length > 0 ? (
                                    order.items.map((item, index) => (
                                        <li key={item?.plateId || index}>
                                            <span>Prato ID: {item?.plateId}</span>
                                            <span> | Quantidade: {item?.quantity}</span>
                                            <span> | Preço: R$ {(item?.price || 0).toFixed(2)}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li>Nenhum item nesta ordem.</li>
                                )}
                            </ul>
                        </div>
                        <div className="order-actions">
                            <button className="btn-status" onClick={() => handleChangeStatus(order?._id, 'Concluído')} disabled={order?.status === 'Concluído'}>
                                Mudar Status
                            </button>
                            <button className="btn-edit" onClick={() => handleEditOrder(order?._id)}>
                                Editar
                            </button>
                            <button className="btn-delete" onClick={() => handleDeleteOrder(order?._id)}>
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}