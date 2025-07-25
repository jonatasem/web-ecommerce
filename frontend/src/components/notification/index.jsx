import { useEffect } from 'react';
import './index.scss';

export default function Notification({ message, type, onClose }) {
    useEffect(() => {
        // Se houver uma mensagem e uma função onClose, configure o timer
        if (message && onClose) {
            const timer = setTimeout(() => {
                onClose(); // Chama a função onClose passada pelo pai
            }, 3000); // Notificação desaparece após 3 segundos

            // Limpa o timer se o componente for desmontado ou se as dependências mudarem
            return () => clearTimeout(timer);
        }
    }, [message, type, onClose]); 

    if (!message) {
        return null; // Não renderiza nada se não houver mensagem
    }

    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
            {onClose && (
                <button className="close-button" onClick={onClose}>&times;</button>
            )}
        </div>
    );
}