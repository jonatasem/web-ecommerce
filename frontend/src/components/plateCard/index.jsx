import './index.scss';

export default function PlateCard({ plateData }) {
    return (
        <article className='item-plate'> 
            <img src={plateData.imgUrl} alt="imagem do prato" />
                <h4>{plateData.name}</h4>
                <h3>$ {plateData.price}</h3>
        </article>
    );
}
