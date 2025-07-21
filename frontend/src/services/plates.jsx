import { useState } from "react";

// Serviço para gerenciamento de pratos
export default function platesServices() {
    const [platesLoading, setPlatesLoading] = useState(false); // Estado de carregamento dos pratos
    const [refetchPlates, setRefetchPlates] = useState(true); // Estado para indicar necessidade de re-fetch
    const [platesList, setPlatesList] = useState([]); // Lista de pratos disponíveis

    const url = `${import.meta.env.VITE_API_URL}/plates`; // URL base para as requisições de pratos

    // Função para obter pratos disponíveis
    const getAvailablePlates = () => {
        setPlatesLoading(true);
        
        fetch(`${url}/availables`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success) {
                setPlatesList(result.body); // Atualiza a lista de pratos
            } else {
                console.log(result); // Tratamento de erro
            }
        })
        .catch((error) => {
            console.log(error); // Tratamento de erro
        })
        .finally(() => {
            setPlatesLoading(false); // Atualiza o estado de carregamento
            setRefetchPlates(false); // Atualiza estado de re-fetch
        });
    };

    return { getAvailablePlates, platesLoading, refetchPlates, platesList }; // Retorna funções e estados
}
