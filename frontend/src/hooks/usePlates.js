import { useState, useCallback } from "react";

export default function platesServices() {
    const [platesLoading, setPlatesLoading] = useState(false);
    const [platesList, setPlatesList] = useState([]);
    const [platesError, setPlatesError] = useState(null);

    const url = `${import.meta.env.VITE_API_URL}/plates`;

    const getAvailablePlates = useCallback(async () => { // Função agora é async
        setPlatesLoading(true);
        setPlatesError(null);

        try {
            const response = await fetch(`${url}/availables`, { // Usa await
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.body?.message || `Erro HTTP: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setPlatesList(result.body);
            } else {
                console.error("Erro da API ao obter pratos:", result);
                setPlatesError(new Error(result.body || "Ocorreu um erro desconhecido na API."));
            }
        } catch (error) {
            console.error("Erro na requisição para obter pratos:", error);
            setPlatesError(error); // Armazena o objeto Error completo
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