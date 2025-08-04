import { useState, useCallback } from "react";
import { apiRequest } from '../service/api/fetch';

export default function usePlatesServices() {
    const [platesLoading, setPlatesLoading] = useState(false);
    const [platesList, setPlatesList] = useState([]);
    const [platesError, setPlatesError] = useState(null);

    const getAvailablePlates = useCallback(async () => {
        setPlatesLoading(true);
        setPlatesError(null);
        try {
            const result = await apiRequest('/plates/availables');
            setPlatesList(result.body);
        } catch (error) {
            setPlatesError(error);
            console.error("Request error fetching plates:", error);
        } finally {
            setPlatesLoading(false);
        }
    }, []);

    return {
        getAvailablePlates,
        platesLoading,
        platesList,
        platesError,
    };
}