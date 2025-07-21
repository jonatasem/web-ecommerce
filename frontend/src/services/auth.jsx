import { useState } from "react";

// Serviço de autenticação para login, logout e registro
export default function authServices() {
    const [authLoading, setAuthLoading] = useState(false); // Estado de carregamento da autenticação

    const url = `${import.meta.env.VITE_API_URL}/auth`; // URL base para as requisições de autenticação

    // Função para login
    const login = (formData) => {
        setAuthLoading(true);
        
        fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(formData) // Envio dos dados do formulário
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success && result.body.token) {
                localStorage.setItem('auth', JSON.stringify({ token: result.body.token, user: result.body.user }));
            }
        })
        .catch((error) => {
            console.log(error); // Tratamento de erro
        })
        .finally(() => {
            setAuthLoading(false); // Atualiza o estado de carregamento
        });
    };

    // Função para logout
    const logout = () => {
        localStorage.removeItem('auth'); // Remove informações de autenticação do localStorage
    };

    // Função para registro
    const signup = (formData) => {
        setAuthLoading(true);
        
        fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success && result.body.token) {
                localStorage.setItem('auth', JSON.stringify({ token: result.body.token, user: result.body.user }));
            }
        })
        .catch((error) => {
            console.log(error); // Tratamento de erro
        })
        .finally(() => {
            setAuthLoading(false); // Atualiza o estado de carregamento
        });
    };

    return { signup, login, logout, authLoading }; // Retorna as funções e o estado de carregamento
}
