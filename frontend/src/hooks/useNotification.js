import { useState, useCallback } from 'react';

export function useNotifications() {
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');

    const showNotification = useCallback((message, type) => {
        setNotificationMessage(message);
        setNotificationType(type);
    }, []);

    const hideNotification = useCallback(() => {
        setNotificationMessage('');
        setNotificationType('');
    }, []);

    return {
        notificationMessage,
        notificationType,
        showNotification,
        hideNotification
    };
}