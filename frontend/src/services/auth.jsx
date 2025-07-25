import { useState } from "react";

// Serviço de autenticação para login, logout e registro
export default function authServices() {
    const [authLoading, setAuthLoading] = useState(false); // Estado de carregamento da autenticação

    const url = `${import.meta.env.VITE_API_URL}/auth`; // URL base para as requisições de autenticação

    // Função para login
    const login = async (formData) => { // Tornada async para permitir await
        setAuthLoading(true);
        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(formData)
            });

            // Verifica se a resposta HTTP foi bem-sucedida (status 2xx)
            if (!response.ok) {
                const errorData = await response.json();
                // Lança um erro para ser pego pelo catch externo
                throw new Error(errorData.message || 'Erro no servidor durante o login.');
            }

            const result = await response.json();

            if (result.success && result.body.token) {
                localStorage.setItem('auth', JSON.stringify({ token: result.body.token, user: result.body.user }));
                return { success: true, user: result.body.user }; // Retorna sucesso
            } else {
                return { success: false, message: result.message || 'Credenciais inválidas.' }; // Retorna falha
            }
        } catch (error) {
            console.error("Erro durante o login:", error);
            return { success: false, message: error.message || 'Erro de rede ou servidor.' };
        } finally {
            setAuthLoading(false);
        }
    };

    // Função para logout
    const logout = () => {
        localStorage.removeItem('auth'); // Remove informações de autenticação do localStorage
    };

    // Função para registro
    const signup = async (formData) => { // Tornada async para permitir await
        setAuthLoading(true);
        try {
            const response = await fetch(`${url}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro no servidor durante o registro.');
            }

            const result = await response.json();

            if (result.success && result.body.token) {
                localStorage.setItem('auth', JSON.stringify({ token: result.body.token, user: result.body.user }));
                return { success: true, user: result.body.user };
            } else {
                return { success: false, message: result.message || 'Erro no registro.' };
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
