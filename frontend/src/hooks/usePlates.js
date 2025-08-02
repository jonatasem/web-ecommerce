import { useState, useCallback } from "react";

export default function platesServices() {
    const [platesLoading, setPlatesLoading] = useState(false);
    const [platesList, setPlatesList] = useState([]);
    const [platesError, setPlatesError] = useState(null);

    // Ensure VITE_API_URL is correctly defined in your .env file
    const url = `${import.meta.env.VITE_API_URL}/plates`;

    const getAvailablePlates = useCallback(async () => {
        setPlatesLoading(true);
        setPlatesError(null); // Clear previous errors

        try {
            const response = await fetch(`${url}/availables`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Attempt to parse error message from response body
                const errorData = await response.json();
                // Prioritize specific message, then generic HTTP status
                throw new Error(errorData.body?.message || `HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setPlatesList(result.body);
            } else {
                console.error("API error fetching plates:", result);
                setPlatesError(new Error(result.body?.message || "An unknown API error occurred."));
            }
        } catch (error) {
            console.error("Request error fetching plates:", error);
            setPlatesError(error); // Store the full Error object
        } finally {
            setPlatesLoading(false);
        }
    }, [url]);

    return {
        getAvailablePlates,
        platesLoading,
        platesList,
        platesError,
    };
}