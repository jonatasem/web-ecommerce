import './index.scss';
import { FaStar } from "react-icons/fa";

export default function PlateCard({ plateData, onAddToCart }) {
    const urlDefault =` ${import.meta.env.VITE_URL_IMAGES}/`;

    // Função para lidar com o clique no botão "Add Product"
    const handleAddClick = (event) => {
        event.stopPropagation(); // Impede que o clique se propague

        if (onAddToCart) {
            // Garante que options e addons são arrays, mesmo que vazios
            const itemToAddToCart = {
                ...plateData,
                options: plateData.options || [], // Se plateData.options for undefined/null, use um array vazio
                addons: plateData.addons || []   // Se plateData.addons for undefined/null, use um array vazio
            };
            onAddToCart(itemToAddToCart); // Chama a função passada via prop com os dados do prato ajustados
        }
    };

    return (
        <article className='item-plate'>
            <img src={urlDefault + plateData.imgUrl} alt="imagem do prato" />
            <div className='plate-main'>
                <h4>{plateData.title}</h4>
                <p>${plateData.sale}</p>
            </div>
            <p>{plateData.description}</p>
            <div className="rating">
                <FaStar className='icon'/>
                <p>5.0</p>
            </div>
            <div className='plate-footer'>
                <button onClick={handleAddClick}>+ Add Product</button>
            </div>
        </article>
    );
}