import { useState, useCallback } from "react";
import { useAuthContext } from '../contexts/useAuthContext';
import { apiRequest } from '../service/api/fetch';

export default function useAuthServices() {
    const [authLoading, setAuthLoading] = useState(false);
    const { setUser } = useAuthContext();

    const login = useCallback(async (formData) => {
        setAuthLoading(true);
        try {
            const result = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            localStorage.setItem('auth', JSON.stringify({ token: result.body.token, user: result.body.user }));
            setUser(result.body.user);
            return { success: true, user: result.body.user };
        } catch (error) {
            console.error("Erro durante o login:", error);
            return { success: false, message: error.message || 'Erro de rede ou servidor.' };
        } finally {
            setAuthLoading(false);
        }
    }, [setUser]);

    const logout = useCallback(() => {
        localStorage.removeItem('auth');
        setUser(null);
    }, [setUser]);

    const signup = useCallback(async (formData) => {
        setAuthLoading(true);
        try {
            const result = await apiRequest('/auth/signup', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            localStorage.setItem('auth', JSON.stringify({ token: result.body.token, user: result.body.user }));
            setUser(result.body.user);
            return { success: true, user: result.body.user };
        } catch (error) {
            console.error("Erro durante o registro:", error);
            return { success: false, message: error.message || 'Erro de rede ou servidor.' };
        } finally {
            setAuthLoading(false);
        }
    }, [setUser]);

    return { signup, login, logout, authLoading };
}