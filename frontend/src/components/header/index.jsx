import React from 'react'; // Importe React
import './index.scss';

import imgHeader from '../../assets/img/header/logo.png';

import imgHome from '../../assets/img/header/home.png';
import imgCustomers from '../../assets/img/header/customers.png';
import imgDashboard from '../../assets/img/header/dashboard.png';
import imgMessage from '../../assets/img/header/message.png';
import imgNotification from '../../assets/img/header/notification.png';
import imgOrder from '../../assets/img/header/order.png';
import imgProduct from '../../assets/img/header/product.png';
import imgSettings from '../../assets/img/header/setting.png';
import imgLogout from '../../assets/img/header/logout.svg';

import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate
import authServices from '../../services/auth'; // Importe o hook authServices

export default function Header(){
    const { logout } = authServices(); // Chame o hook e desestruture a função logout
    const navigate = useNavigate(); // Inicialize useNavigate para redirecionamento

    const handleLogout = () => {
        logout(); // Chama a função logout para remover o item do localStorage
        navigate('/login', { replace: true }); // Redireciona para a página de login
    };

    return (
        <header className="container-header">
            <div className="logo-header">
                <img src={imgHeader} alt="logotipo" />
            </div>
            <ul>
                <li>
                    <Link to="/">
                        <img src={imgHome} alt="item header" />
                    </Link>
                </li>
                <li>
                    <img src={imgDashboard} alt="item header" />
                </li>
                <li>
                    <img src={imgOrder} alt="item header" />
                </li>
                <li>
                    <img src={imgProduct} alt="item header" />
                </li>
                <li>
                    <img src={imgNotification} alt="item header" />
                </li>
                <li>
                    <img src={imgCustomers} alt="item header" />
                </li>
                <li>
                    <img src={imgMessage} alt="item header" />
                </li>
                <li>
                    <img src={imgSettings} alt="item header" />
                </li>
                <li className='logout-icon' onClick={handleLogout}> {/* Chame a função handleLogout */}
                    <img src={imgLogout} alt="ícone de logout" /> {/* Alt text mais descritivo */}
                </li>
            </ul>
        </header>
    );
}