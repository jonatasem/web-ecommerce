import platesServices from "../../services/plates"; // Importa o serviço de pratos
import { useEffect, useState } from "react"; // Importa hooks do React
import Loading from "../../components/loading"; // Componente de carregamento
import PlateCard from "../../components/plateCard"; // Componente para exibição de pratos
import PlatePopup from "../../components/platePopup"; // Componente para exibir detalhes do prato
import { useCartContext } from "../../contexts/useCartContext"; // Contexto do carrinho
import Notification from "../../components/notification"; // Importa o componente de notificação
import './index.scss';

export default function Plates() {
    const { getAvailablePlates, platesList, platesLoading, refetchPlates } = platesServices(); // Obtém os serviços de pratos
    const [plateSelected, setPlateSelected] = useState(null); // Estado para armazenar prato selecionado
    const [notification, setNotification] = useState(""); // Estado para a notificação
    const { addToCart } = useCartContext(); // Hook do contexto do carrinho
    const [filter, setFilter] = useState("All"); // Estado para armazenar o filtro selecionado
    const [loadingFilters, setLoadingFilters] = useState(false); // Estado de carregamento para filtros

    // Efeito para buscar pratos disponíveis quando refetchPlates mudar
    useEffect(() => {
        if (refetchPlates) {
            getAvailablePlates(); // Chama a função para buscar pratos
        }
    }, [refetchPlates]);

    // Função para definir o prato selecionado
    const handlePlateSelected = (plate) => {
        setPlateSelected(plate); // Atualiza o estado com o prato selecionado
    };

    // Função para fechar o popup de detalhes do prato
    const handleClosePopup = () => {
        setPlateSelected(null); // Reseta o estado do prato selecionado
    };

    // Função para adicionar um prato ao carrinho
    const handleAddToCart = (itemToAdd) => {
        addToCart(itemToAdd); // Adiciona o prato ao carrinho
        setNotification(`${itemToAdd.name} adicionado ao carrinho!`); // Define a mensagem da notificação
        handleClosePopup(); // Fecha o popup
    };

    // Função para aplicar o filtro
    const handleFilterChange = (category) => {
        setLoadingFilters(true); // Define o estado de carregamento para true
        setFilter(category); // Atualiza o estado do filtro

        // Simula um carregamento antes de aplicar o filtro (por exemplo, em uma API real)
        setTimeout(() => {
            setLoadingFilters(false); // Define o estado de carregamento para false após o carregamento
        }, 500); // Tempo de simulação de 500ms
    };

    // Filtra a lista de pratos com base na categoria selecionada
    const filteredPlates = filter === "All" ? platesList : platesList.filter(plate => plate.category === filter);

    // Exibe o componente de carregamento enquanto busca pratos
    if (platesLoading || loadingFilters) {
        return (<Loading />);
    }

    return (
        <section className="plates-container">
            <article className="plates-head mobile">
                <ul>
                    <li onClick={() => handleFilterChange("All")} 
                        className={filter === "All" ? "active" : ""}
                        >Todos
                    </li>
                    <li onClick={() => handleFilterChange("Meat")} 
                        className={filter === "Meat" ? "active" : ""}
                        >Salgados
                    </li>
                    <li onClick={() => handleFilterChange("Candy")} 
                        className={filter === "Candy" ? "active" : ""}
                        >Sobremesas
                    </li>
                    <li onClick={() => handleFilterChange("Diet")} 
                        className={filter === "Diet" ? "active" : ""}
                        >Café da manha
                    </li>
                </ul>
                <button onClick={() => handleFilterChange("All")}>Ver Todos</button>
            </article>

            <div className="container-itens-plate">
                {filteredPlates.map((plate) => (
                    <div className="layout-item-plate" key={plate._id} onClick={() => { handlePlateSelected(plate); }}>
                        <PlateCard plateData={plate} />
                    </div>
                ))}
            </div>

            {/* Exibe o popup de detalhes do prato se um prato estiver selecionado */}
            {plateSelected && (
                <PlatePopup 
                    plateData={plateSelected} 
                    onClose={handleClosePopup} 
                    onAddToCart={handleAddToCart}
                />
            )}

            {/* Exibe a notificação se houver uma mensagem */}
            <Notification message={notification} onClose={() => setNotification("")} />
        </section>
    );
}
