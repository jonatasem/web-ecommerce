import { useState, useCallback } from "react";

// Serviço para gerenciamento de pedidos
export default function orderServices() {
    const [orderLoading, setOrderLoading] = useState(false); // Estado de carregamento dos pedidos
    const [ordersList, setOrdersList] = useState([]); // Lista de pedidos do usuário
    const [ordersError, setOrdersError] = useState(null); // NOVO: Estado para erros na busca de pedidos

    const url = `${import.meta.env.VITE_API_URL}/orders`; // URL base para as requisições de pedidos

    // Função para obter pedidos do usuário
    const getUserOrders = useCallback(async (userId) => {
        setOrderLoading(true);
        setOrdersError(null); // Limpa erros anteriores
        try {
            const response = await fetch(`${url}/userorders/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': '*' // Removido, deve ser configurado no backend
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.body?.message || `HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                setOrdersList(result.body); // Atualiza a lista de pedidos
            } else {
                console.error("API error fetching user orders:", result);
                setOrdersError(new Error(result.body?.message || "An unknown API error occurred while fetching orders."));
            }
        } catch (error) {
            console.error("Request error fetching user orders:", error);
            setOrdersError(error); // Armazena o objeto Error completo
        } finally {
            setOrderLoading(false); // Update loading state
        }
    }, [url]);

    // Função para enviar um novo pedido
    const sendOrder = useCallback(async (orderData) => {
        setOrderLoading(true);
        setOrdersError(null); // Limpa erros anteriores
        try {
            const response = await fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.body?.message || `HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Order result:", result);
            // Se o envio da ordem for bem-sucedido, você pode querer refetch as ordens do usuário
            // setRefetchOrders(true); // Se você tiver um estado para refetch
            return { success: true, data: result.body }; // Retorna o resultado para quem chamou
        } catch (error) {
            console.error("Request error sending order:", error);
            setOrdersError(error);
            return { success: false, message: error.message }; // Retorna o erro para quem chamou
        } finally {
            setOrderLoading(false);
        }
    }, [url]);

    // O estado refetchOrders não é mais necessário aqui se getUserOrders for chamado diretamente no useEffect
    // baseado nas dependências do userId. Se você tiver outras lógicas que exijam um refetch manual,
    // considere adicionar uma função triggerRefetch ou algo similar.
    return { getUserOrders, orderLoading, ordersList, ordersError, sendOrder };
}
