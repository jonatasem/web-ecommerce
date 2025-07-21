import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importação das páginas do aplicativo
import Cart from './pages/cart';
import Profile from './pages/profile';
import Plates from './pages/plates';
import Auth from './pages/auth';

// Criação do roteador com as rotas do aplicativo
const pages = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Plates /> },
            { path: '/carrinho', element: <Cart /> },
            { path: '/perfil', element: <Profile /> },
            { path: '/auth', element: <Auth /> },
        ]
    }
]);

// Renderiza o aplicativo na raiz do DOM
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={pages}></RouterProvider>
    </React.StrictMode>,
);
