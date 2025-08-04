import React, { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const storedAuth = localStorage.getItem('auth');
            return storedAuth ? JSON.parse(storedAuth).user : null;
        } catch (error) {
            console.error("Failed to parse auth from localStorage:", error);
            return null;
        }
    });

    const setUser = (userData, token) => {
        setCurrentUser(userData);
        if (userData) {
            const authData = { user: userData, token: token || JSON.parse(localStorage.getItem('auth'))?.token };
            localStorage.setItem('auth', JSON.stringify(authData));
        } else {
            localStorage.removeItem('auth');
        }
    };

    const contextValue = useMemo(() => ({
        currentUser,
        setUser,
        isAuthenticated: !!currentUser,
    }), [currentUser]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

