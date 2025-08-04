import React from 'react';
import ProtectedRoute from './ProtectedRoute.jsx';
import App from './App.jsx';

// Importa todas as páginas protegidas
import HomePage from './pages/homePage/index.jsx';
import DashboardPage from './pages/dashboardPage/index.jsx';
import OrdersPage from './pages/ordersPage/index.jsx';
import ProductsPage from './pages/productsPage/index.jsx';
import NotificationPage from './pages/notificationPage/index.jsx';
import CustomersPage from './pages/customersPage/index.jsx';
import MessagePage from './pages/messagePage/index.jsx';
import SettingsPage from './pages/settingsPage/index.jsx';

const protectedRoutes = [
    {
        element: <ProtectedRoute><App /></ProtectedRoute>,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'settings', element: <SettingsPage /> },
            { path: 'message', element: <MessagePage /> },
            { path: 'customers', element: <CustomersPage /> },
            { path: 'notification', element: <NotificationPage /> },
            { path: 'products', element: <ProductsPage /> },
            { path: 'orders', element: <OrdersPage /> },
            { path: 'dashboard', element: <DashboardPage /> },
        ],
    },
];

export default protectedRoutes;