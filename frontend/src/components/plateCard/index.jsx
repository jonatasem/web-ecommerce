import './index.scss';
import { FaStar } from "react-icons/fa";

export default function PlateCard({ plateData, onAddToCart }) {

    // Function to handle the "Add Product" button click
    const handleAddClick = (event) => {
        event.stopPropagation(); // Prevents the click from propagating

        if (onAddToCart) {
            // Ensures options and addons are arrays, even if empty
            const itemToAddToCart = {
                ...plateData,
                options: plateData.options || [], // If plateData.options is undefined/null, use an empty array
                addons: plateData.addons || []   // If plateData.addons is undefined/null, use an empty array
            };
            onAddToCart(itemToAddToCart); // Calls the function passed via prop with the adjusted plate data
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
                <p>5.0</p> {/* Consider making this dynamic based on plateData if available */}
            </div>
            <div className='plate-footer'>
                <button onClick={handleAddClick}>+ Add Product</button>
            </div>
        </article>
    );
}
