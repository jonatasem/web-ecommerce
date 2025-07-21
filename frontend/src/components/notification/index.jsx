import { useEffect } from "react";
import './index.scss'; // Certifique-se de ter um arquivo de estilo para o componente

export default function Notification({ message, duration = 3000, onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose(); // Fecha a notificação após o tempo especificado
            }, duration);
            return () => clearTimeout(timer); // Limpa o timer ao desmontar
        }
    }, [message, duration, onClose]);

    return (
        <section className={`notification-container ${message ? 'show' : ''}`}>
            <span>{message}</span>
            <button className="btn-close-notification" onClick={onClose}>
                &times;
            </button>
        </section>
    );
}