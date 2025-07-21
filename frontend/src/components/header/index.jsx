import { LuShoppingCart, LuUserCircle } from "react-icons/lu"; // Importa ícones
import { Drawer } from '@mui/material'; // Importa o componente Drawer do Material-UI
import { useState } from 'react'; // Importa hook useState
import { Link, useLocation } from 'react-router-dom'; // Importa o componente Link e useLocation
import { FaGear } from "react-icons/fa6";
import './index.scss';

import imgLogo from '../../assets/img/logo.png';

import { MdOutlineRestaurantMenu } from "react-icons/md";
import { CiHome } from "react-icons/ci";

export default function Navbar({ totalItems }) { // Recebe o total de itens como prop
    const [openMenu, setOpenMenu] = useState(false); // Estado para controlar a abertura do menu
    const location = useLocation(); // Obtém a localização atual

    // Função para abrir ou fechar o menu lateral
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    // Função para definir o título com base na rota
    const getTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Início';
            case '/plates':
                return 'Cardápio';
            case '/cart':
                return 'Carrinho';
            case '/profile':
                return 'Perfil';
            case '/auth':
                return 'Autenticação';
            default:
                return 'Restaurante';
        }
    };

    return (
        <header className="header-container">
            <div className="layout-header">
                <div className="layout-head">
                    <div className="header-logo">
                        <img src={imgLogo} alt="" />
                    </div>
                    <nav className="header-nav">
                        <li>
                            <Link to={'/'}>
                                <CiHome className="icon" />
                                <span>Início</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/perfil'}>
                                <LuUserCircle />
                                <span>Perfil</span>
                            </Link>
                        </li>
                    </nav>
                    <nav className="btn-cart-profile">
                        <li className="menu-cart-number">
                            <Link to={'/carrinho'}>
                                <LuShoppingCart />
                                {totalItems > 0 && <span className="cart-item-count">{totalItems}</span>}
                            </Link>
                        </li>
                    </nav>
                    <div className="header-right" onClick={handleOpenMenu}>
                        <FaGear />
                    </div>
                    <Drawer
                        anchor='left'
                        open={openMenu}
                        onClose={handleOpenMenu}
                    >
                        <div className="drawer-container">
                            <div className="logo-drawer">
                                <img src={imgLogo} alt="Logo Drawer" />
                            </div>
                            <div className="links-drawer">
                                <Link to={'/'} onClick={handleOpenMenu}>
                                    <CiHome className="icon" />
                                    Início
                                </Link>
                                <Link to={'/perfil'}>
                                    <LuUserCircle className="icon"/>
                                    Perfil
                                </Link>
                            </div>
                            <div className="footer-drawer">
                                <p>Desenvolvido por Jonatas Moreira</p>
                            </div>
                        </div>
                    </Drawer>
                </div>
                <div className="title-header">
                    <h1><span>{getTitle()}</span> Restaurante</h1>
                    <article className="title-pages">
                        <p>{location.pathname.replace('/', '') || 'home'}</p> 
                    </article>
                </div>
            </div>
        </header>
    );
}
