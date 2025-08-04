import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.scss';

import LoginPage from './pages/loginPage/index.jsx';
import SignupPage from './pages/signupPage/index.jsx';
import ForgetPasswordPage from './pages/forgetPasswordPage/index.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import { AuthProvider } from './contexts/useAuthContext.jsx';


const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/forget-password',
        element: <ForgetPasswordPage />,
    },
    ...ProtectedRoutes, 
    {
        path: '*',
        element: <div className='page-not-found'>Página não encontrada!</div>,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
);