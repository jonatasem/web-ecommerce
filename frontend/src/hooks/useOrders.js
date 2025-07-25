import { useState } from "react";

// Serviço para gerenciamento de pedidos
export default function orderServices() {
    const [orderLoading, setOrderLoading] = useState(false); // Estado de carregamento dos pedidos
    const [refetchOrders, setRefetchOrders] = useState(true); // Estado para indicar necessidade de re-fetch
    const [ordersList, setOrdersList] = useState([]); // Lista de pedidos do usuário

    const url = $`{import.meta.env.VITE_API_URL}/orders`; // URL base para as requisições de pedidos

    // Função para obter pedidos do usuário
    const getUserOrders = (userId) => {
        setOrderLoading(true);

        fetch(`${url}/userorders/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    setOrdersList(result.body); // Atualiza a lista de pedidos
                } else {
                    console.log(result); // Tratamento de erro
                }
            })
            .catch((error) => {
                console.log(error); // Tratamento de erro
            })
            .finally(() => {
                setOrderLoading(false); // Atualiza o estado de carregamento
                setRefetchOrders(false); // Atualiza estado de re-fetch
            });
    };

    // Função para enviar um novo pedido
    const sendOrder = (orderData) => {
        setOrderLoading(true);

        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(orderData)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result); // Log do resultado do pedido
            })
            .catch((error) => {
                console.log(error); // Tratamento de erro
            })
            .finally(() => {
                setOrderLoading(false); // Atualiza o estado de carregamento
            });
    };

    return { getUserOrders, orderLoading, refetchOrders, ordersList, sendOrder }; // Retorna funções e estados
}