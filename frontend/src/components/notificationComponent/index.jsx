import { useEffect } from 'react';

export default function NotificationComponent({ message, type, onClose }) {
    useEffect(() => {
        if (message && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]); 

    if (!message) {
        return null;
    }

    const className = `notification-message ${type}`;

    return (
        <div className={`notification-page ${className}`}>
            <p>{message}</p>
            {onClose && (
                <button className="close-button" onClick={onClose}>&times;</button>
            )}
        </div>
    );
}
