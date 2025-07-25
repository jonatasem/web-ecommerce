import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Verifica se o usuário está autenticado.
    // A presença de 'auth' no localStorage indica autenticação neste exemplo.
    const isAuthenticated = localStorage.getItem('auth');

    if (!isAuthenticated) {
        // Se o usuário não estiver autenticado, redireciona para a página de login.
        // replace: true impede que o usuário volte para a página protegida usando o botão "voltar".
        return <Navigate to="/login" replace />;
    }

    // Se estiver autenticado, renderiza os componentes filhos (geralmente o <App /> e suas rotas aninhadas)
    return children ? children : <Outlet />;
};

export default ProtectedRoute;