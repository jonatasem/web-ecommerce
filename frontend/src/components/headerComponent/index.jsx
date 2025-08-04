import { useState } from 'react';
import './index.scss';

import {
    FaHome,
    FaTachometerAlt,
    FaShoppingCart,
    FaBoxOpen,
    FaBell,
    FaUsers,
    FaPaperPlane,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import imgHeader from '../../assets/img/header/logo.png';

import { NavLink, useNavigate } from 'react-router-dom';
import authServices from '../../hooks/useAuth';
import Mobile from '../mobileComponent';
import { Drawer } from '@mui/material';

export default function HeaderComponent(){
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
                    <NavLink to="/" activeClassName="active" end> 
                        <FaHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" activeClassName="active">
                        <FaTachometerAlt />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/orders" activeClassName="active">
                        <FaShoppingCart />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" activeClassName="active">
                        <FaBoxOpen />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/notification" activeClassName="active">
                        <FaBell />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/customers" activeClassName="active">
                        <FaUsers />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/message" activeClassName="active">
                        <FaPaperPlane />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" activeClassName="active">
                        <FaCog />
                    </NavLink>
                </li>
                <li className='logout-icon' onClick={handleLogout}>
                    <FaSignOutAlt />
                </li>
            </ul>
            <div className="mobile-header">
                <Mobile toggleDrawer={toggleDrawer(true)}/>
            </div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <ul className='drawer-nav'>
                    <li>
                        <NavLink to="/" activeClassName="active" end onClick={toggleDrawer(false)}>
                            <FaHome className='icon-drawer'/>
                            <p>Home</p>
                        </NavLink>
                    </li>
                    <li>
                       <NavLink to="/dashboard" activeClassName="active" end onClick={toggleDrawer(false)}>
                            <FaTachometerAlt className='icon-drawer'/>
                            <p>Dashboard</p>
                        </NavLink>
                    </li>
                    <li>
                       <NavLink to="/orders" activeClassName="active" end onClick={toggleDrawer(false)}>
                            <FaShoppingCart className='icon-drawer'/>
                            <p>Orders</p>
                        </NavLink>
                    </li>
                    <li>
                       <NavLink to="/products" activeClassName="active" end onClick={toggleDrawer(false)}>
                            <FaBoxOpen className='icon-drawer'/>
                            <p>Products</p>
                        </NavLink>
                    </li>
                    <li>
                       <NavLink to="/notification" activeClassName="active" end onClick={toggleDrawer(false)}>
                            <FaBell className='icon-drawer'/>
                            <p>Notification</p>
                        </NavLink>
                    </li>
                    <li>
                       <NavLink to="/customers" activeClassName="active" end onClick={toggleDrawer(false)}>
                            <FaUsers className='icon-drawer'/>
                            <p>Customers</p>
                        </NavLink>
                    </li>
                    <li>
                       <NavLink to="/message" activeClassName="active" end onClick={toggleDrawer(false)}>
                            <FaPaperPlane className='icon-drawer'/>
                            <p>Message</p>
                        </NavLink>
                    </li>
                    <li>
                       <NavLink to="/settings" activeClassName="active" end onClick={toggleDrawer(false)}>
                            <FaCog className='icon-drawer'/>
                            <p>Settings</p>
                        </NavLink>
                    </li>
                    <li className='logout-icon' onClick={handleLogout}>
                        <FaSignOutAlt className='icon-drawer'/>
                        <p>Logout</p>
                    </li>
                </ul>
            </Drawer>
        </header>
    );
}