import { FaStar } from "react-icons/fa";

export default function PlateComponent({ plateData, onAddToCart }) {
    const handleAddClick = (event) => {
        event.stopPropagation();
        if (onAddToCart) {
            const itemToAddToCart = {
                ...plateData,
                options: plateData.options || [],
                addons: plateData.addons || []
            };
            onAddToCart(itemToAddToCart);
        }
    };

    return (
        <article className='item-plate'>
            <img src={plateData.imgUrl} alt="imagem do prato" />
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