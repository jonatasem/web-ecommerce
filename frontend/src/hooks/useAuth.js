import { useState } from "react";
import { useAuthContext } from '../contexts/useAuthContext';

// Serviço de autenticação para login, logout e registro
export default function authServices() {
    const [authLoading, setAuthLoading] = useState(false);
    const { setUser } = useAuthContext();

    const url = `${import.meta.env.VITE_API_URL}/auth`;

   
    const login = async (formData) => {
        setAuthLoading(true);
        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                   
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro no servidor durante o login.');
            }

            const result = await response.json();

            if (result.success && result.body.token && result.body.user) {
               
                localStorage.setItem('auth', JSON.stringify({ token: result.body.token, user: result.body.user }));
               
                setUser(result.body.user);
                return { success: true, user: result.body.user };
            } else {
                return { success: false, message: result.message || 'Credenciais inválidas ou dados de usuário incompletos.' };
            }
        } catch (error) {
            console.error("Erro durante o login:", error);
            return { success: false, message: error.message || 'Erro de rede ou servidor.' };
        } finally {
            setAuthLoading(false);
        }
    };

   
    const logout = () => {
        localStorage.removeItem('auth');
        setUser(null);
    };

   
    const signup = async (formData) => {
        setAuthLoading(true);
        try {
            const response = await fetch(`${url}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                   
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro no servidor durante o registro.');
            }

            const result = await response.json();

            if (result.success && result.body.token && result.body.user) {
                localStorage.setItem('auth', JSON.stringify({ token: result.body.token, user: result.body.user }));
                setUser(result.body.user);
                return { success: true, user: result.body.user };
            } else {
                return { success: false, message: result.message || 'Erro no registro ou dados de usuário incompletos.' };
            }
        } catch (error) {
            console.error("Erro durante o registro:", error);
            return { success: false, message: error.message || 'Erro de rede ou servidor.' };
        } finally {
            setAuthLoading(false);
        }
    };

    return { signup, login, logout, authLoading };
}