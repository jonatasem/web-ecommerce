export async function apiRequest(endpoint, options = {}) {
    const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const finalOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    let result;
    try {
        const response = await fetch(url, finalOptions);

        const responseText = await response.text();
        try {
            result = JSON.parse(responseText);
        } catch (jsonError) {
            throw new Error(`responseText || HTTP error! Status: ${response.status}`);
        }

        if (!response.ok || (result && !result.success)) {
            const errorMessage = `result?.body?.text || result?.body?.message || result?.message || HTTP error! Status: ${response.status}`;
            throw new Error(errorMessage);
        }

        return result;
    } catch (error) {
        throw new Error(`Request failed: ${error.message}`);
    }
}