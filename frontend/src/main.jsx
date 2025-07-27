import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Profile from './pages/profile';
import HomePage from './pages/home/index.jsx';
import LoginPage from './pages/login/index.jsx';

// Importe o componente ProtectedRoute
import ProtectedRoute from './ProtectedRoute.jsx';
import SignupPage from './pages/signup/index.jsx'; // Certifique-se de que o caminho está correto
import ForgetPassword from './pages/forgetPassword/index.jsx';
import DashboardPage from './pages/dashboard/index.jsx';

// Criação do roteador com as rotas do aplicativo
const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/signup',
        element: <SignupPage />
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />
    },
    {
        // Esta é a rota base para todas as páginas protegidas.
        // O element usa ProtectedRoute para garantir que o acesso seja feito apenas por usuários autenticados.
        path: '/',
        element: <ProtectedRoute><App /></ProtectedRoute>,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/perfil', element: <Profile /> },

            { path: '/dashboard', element: <DashboardPage /> }
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