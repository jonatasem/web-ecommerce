import { useState, useCallback } from "react";
import { apiRequest } from '../service/api/fetch.js';

export default function useOrderServices() {
    const [orderLoading, setOrderLoading] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const [ordersError, setOrdersError] = useState(null);

    const getUserOrders = useCallback(async (userId) => {
        setOrderLoading(true);
        setOrdersError(null);
        try {
            const result = await apiRequest(`/orders/userorders/${userId}`);
            setOrdersList(result.body);
        } catch (error) {
            setOrdersError(error);
            console.error("Request error fetching user orders:", error);
        } finally {
            setOrderLoading(false);
        }
    }, []);

    const sendOrder = useCallback(async (orderData) => {
        setOrderLoading(true);
        setOrdersError(null);
        try {
            const result = await apiRequest('/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
            return { success: true, data: result.body };
        } catch (error) {
            setOrdersError(error);
            console.error("Request error sending order:", error);
            return { success: false, message: error.message };
        } finally {
            setOrderLoading(false);
        }
    }, []);

    return { getUserOrders, orderLoading, ordersList, ordersError, sendOrder };
}