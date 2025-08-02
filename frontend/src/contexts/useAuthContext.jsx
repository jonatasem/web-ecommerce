import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Cria o contexto de autenticação
const AuthContext = createContext(null);

// Provedor de autenticação que gerencia o estado do usuário
export function AuthProvider({ children }) {
    // Estado para armazenar as informações do usuário logado
    // Inicializa com os dados do localStorage, se existirem
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const storedAuth = localStorage.getItem('auth');
            return storedAuth ? JSON.parse(storedAuth).user : null;
        } catch (error) {
            console.error("Failed to parse auth from localStorage:", error);
            return null;
        }
    });

    // Função para atualizar o usuário logado e o localStorage
    const setUser = (userData) => {
        setCurrentUser(userData);
        if (userData) {
            // Se userData inclui o token, armazene ambos.
            // Assumimos que userData aqui já é o objeto 'user' do seu backend.
            // O token deve ser armazenado separadamente ou junto com o user se for necessário.
            // Para simplicidade, vou assumir que você já tem o token no localStorage via authServices.
            // Se o token for parte do userData, você pode ajustar aqui.
            const currentAuth = JSON.parse(localStorage.getItem('auth') || '{}');
            localStorage.setItem('auth', JSON.stringify({ ...currentAuth, user: userData }));
        } else {
            localStorage.removeItem('auth');
        }
    };

    // O valor do contexto que será fornecido aos componentes filhos
    const contextValue = useMemo(() => ({
        currentUser,
        setUser, // Função para atualizar o usuário
        // Você pode adicionar outras funções ou estados aqui, como 'isAuthenticated'
        isAuthenticated: !!currentUser,
    }), [currentUser]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para consumir o contexto de autenticação
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};