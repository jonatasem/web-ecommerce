import { Dialog } from "@mui/material";
import './index.scss';

export default function PlatePopup({ plateData, onClose, onAddToCart }) {
    return (
        <Dialog open={true} onClose={onClose}> 
            <div className="item-plate-popup">
                <img src={plateData.imgUrl} alt="" /> 
                <div>
                    <h2>{plateData.name}</h2> 
                    <p>[{String(plateData.ingredients)}]</p> 
                    <p>{plateData.description}</p> 
                    <h3>$ {plateData.price}</h3> 
                    <div className="layout-popup">
                        <button onClick={() => { onAddToCart(plateData); }}>Adicionar ao carrinho</button> 
                    </div>
                </div>
            </div>
        </Dialog>
    );
}