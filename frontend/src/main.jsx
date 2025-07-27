import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home/index.jsx';
import LoginPage from './pages/login/index.jsx';

import ProtectedRoute from './ProtectedRoute.jsx';
import SignupPage from './pages/signup/index.jsx'; 
import ForgetPassword from './pages/forgetPassword/index.jsx';
import DashboardPage from './pages/dashboard/index.jsx';
import OrdersPage from './pages/orders/index.jsx';
import ProductsPage from './pages/products/index.jsx';
import NotificationPage from './pages/notification/index.jsx';
import CustomersPage from './pages/customers/index.jsx';
import MessagePage from './pages/message/index.jsx';
import SettingsPage from './pages/settings/index.jsx';

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
            { path: '/settings', element: <SettingsPage /> },
            { path: '/message', element: <MessagePage /> },
            { path: '/customers', element: <CustomersPage /> },
            { path: '/notification', element: <NotificationPage /> },
            { path: '/products', element: <ProductsPage /> },
            { path: '/orders', element: <OrdersPage /> },
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