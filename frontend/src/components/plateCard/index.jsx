import './index.scss';

import { FaStar } from "react-icons/fa";

export default function PlateCard({ plateData }) {

    const urlDefault = `${import.meta.env.VITE_URL_IMAGES}/`;
    
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
                <button>+ Add Product</button>
               </div>
        </article>
    );
}
