import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importação das páginas do aplicativo
import Cart from './pages/cart';
import Profile from './pages/profile';
import HomePage from './pages/home/index.jsx';
import LoginPage from './pages/login/index.jsx';

// Importe o componente ProtectedRoute
import ProtectedRoute from './ProtectedRoute.jsx';
import SignupPage from './pages/signup/index.jsx'; // Certifique-se de que o caminho está correto

// Criação do roteador com as rotas do aplicativo
const router = createBrowserRouter([
    {
        // Rota pública para a página de login.
        path: '/login',
        element: <LoginPage />
        // Removido: children: [{path: 'signup', element: <SignupPage />}] - AGORA É UMA ROTA SEPARADA
    },
    {
        // Rota separada para a página de registro (Signup)
        path: '/signup',
        element: <SignupPage />
    },
    {
        // Esta é a rota base para todas as páginas protegidas.
        // O element usa ProtectedRoute para garantir que o acesso seja feito apenas por usuários autenticados.
        path: '/',
        element: <ProtectedRoute><App /></ProtectedRoute>,
        children: [
            // Rotas aninhadas que serão renderizadas dentro do <Outlet> em <App>.
            // index: true define HomePage como a rota padrão para /.
            { index: true, element: <HomePage /> },
            { path: 'carrinho', element: <Cart /> },
            { path: 'perfil', element: <Profile /> }
        ]
    },

    {
        path: '*',
        element: <div className='page-not-found'>Página não encontrada!</div>
    }
]);

// Renderiza o aplicativo na raiz do DOM
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>,
);