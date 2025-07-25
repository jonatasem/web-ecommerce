import { useEffect } from "react"; // Importa hook useEffect
import { useNavigate } from "react-router-dom"; // Importa hook useNavigate para navegação
import authServices from "../../hooks/useAuth"; // Serviço de autenticação
import orderServices from "../../hooks/useOrders"; // Serviço de pedidos
import { LuLogOut, LuTimer, LuAlertCircle, LuCheckCircle } from "react-icons/lu"; // Ícones
import { Link } from "react-router-dom"; // Link para navegação
import Loading from "../../components/loading"; // Componente de carregamento
import './index.scss';

import imgProfile from '../../assets/img/profile/profile.png'

export default function Profile() {
    const { logout } = authServices(); // Função de logout do serviço de autenticação
    const { getUserOrders, orderLoading, refetchOrders, ordersList } = orderServices(); // Obtém serviços de pedidos
    const navigate = useNavigate(); // Navegador para redirecionamento
    const authData = JSON.parse(localStorage.getItem('auth')); // Dados de autenticação do localStorage

    // Efeito para verificar autenticação e buscar pedidos
    useEffect(() => {
        if (!authData) {
            return navigate('/auth'); // Redireciona para autenticação se não estiver logado
        } else if (refetchOrders) {
            getUserOrders(authData?.user?._id); // Busca pedidos do usuário
        }
    }, [authData, refetchOrders]);

    // Exibe o componente de carregamento enquanto busca pedidos
    if (orderLoading) {
        return (<Loading />);
    }

    // Função para lidar com logout
    const handleLogout = () => {
        logout(); // Executa a função de logout
        return navigate('/'); // Redireciona para a página inicial
    };

    return (
        <div className="profile-container">
            <div className="profile-left">
                <img src={imgProfile} alt="" />
                <h1>Seja bem vindo(a)! {authData?.user?.fullname}</h1>
                <h3>E-Mail: {authData?.user?.email}</h3>
                <button onClick={handleLogout}><LuLogOut className="icon"/></button>
            </div>

            <h1 className="title-profile">Histórico de Pedidos</h1>

            {ordersList.length > 0 ? (
                <article className="profile-main">
                    {ordersList.map((order) => (
                        <div className="profile-main-layout" key={order._id}>
                            {order.pickupStatus === 'Pending' && <p className="item-profile-pending"><LuTimer /> {order.pickupStatus}</p>}
                            {order.pickupStatus === 'Completed' && <p className="item-profile-completed"><LuCheckCircle /> {order.pickupStatus}</p>}
                            {order.pickupStatus === 'Canceled' && <p className="item-profile-canceled"><LuAlertCircle /> {order.pickupStatus}</p>}
                            <h3>{order.pickupTime}</h3>
                            {order.orderItems.map((item) => (
                                <div key={item._id}>
                                    <h4>{item.itemDetails[0].name}</h4>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </article>
            ) : (
                <article className="profile-right">
                    <p>Você ainda não realizou nenhum pedido!</p>
                    <Link to={'/'}>Clique aqui e comece a comprar</Link>
                </article>
            )}
        </div>
    );
}