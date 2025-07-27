import { useState } from 'react';
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

import { Link, useNavigate } from 'react-router-dom';
import authServices from '../../hooks/useAuth';
import Mobile from '../mobile';
import { Drawer } from '@mui/material'; 

export default function Header(){
    const { logout } = authServices();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <header className="container-header">
            <div className="logo-header">
                <img src={imgHeader} alt="logotipo" />
            </div>
            <ul className='nav-header'>
                <li>
                    <Link to="/">
                        <img src={imgHome} alt="Home icon" />
                    </Link>
                </li>
                <li>
                    <img src={imgDashboard} alt="Dashboard icon" />
                </li>
                <li>
                    <img src={imgOrder} alt="Order icon" />
                </li>
                <li>
                    <img src={imgProduct} alt="Product icon" />
                </li>
                <li>
                    <img src={imgNotification} alt="Notification icon" />
                </li>
                <li>
                    <img src={imgCustomers} alt="Customers icon" />
                </li>
                <li>
                    <img src={imgMessage} alt="Message icon" />
                </li>
                <li>
                    <img src={imgSettings} alt="Settings icon" />
                </li>
                <li className='logout-icon' onClick={handleLogout}>
                    <img src={imgLogout} alt="Logout icon" />
                </li>
            </ul>
            <div className="mobile-header">
                <Mobile toggleDrawer={toggleDrawer(true)}/>
            </div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <ul className='drawer-nav'>
                    <li>
                        <Link to="/" onClick={toggleDrawer(false)}>
                            <img src={imgHome} alt="Home icon" />
                            <p>home</p>
                        </Link>
                    </li>
                    <li>
                        <img src={imgDashboard} alt="Dashboard icon" />
                        <p>dashboard</p>
                    </li>
                    <li>
                        <img src={imgOrder} alt="Order icon" />
                        <p>order</p>
                    </li>
                    <li>
                        <img src={imgProduct} alt="Product icon" />
                        <p>product</p>
                    </li>
                    <li>
                        <img src={imgNotification} alt="Notification icon" />
                        <p>notification</p>
                    </li>
                    <li>
                        <img src={imgCustomers} alt="Customers icon" />
                        <p>customers</p>
                    </li>
                    <li>
                        <img src={imgMessage} alt="Message icon" />
                        <p>message</p>
                    </li>
                    <li>
                        <img src={imgSettings} alt="Settings icon" />
                        <p>settings</p>
                    </li>
                    <li className='logout-icon' onClick={handleLogout}>
                        <img src={imgLogout} alt="Logout icon" />
                        <p>logout</p>
                    </li>
                </ul>
            </Drawer>
        </header>
    );
}