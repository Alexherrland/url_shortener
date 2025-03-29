import axios from 'axios';
import authService from './authService';

const BASE_URL = 'http://localhost:8000/api/urls/';

const getAuthHeaders = () => {
    const user = authService.getCurrentUser();
    
    // Add Authorization header if the user is logged in
    // This is the key change - we need to send the user token
    if (user) {
        return { 
            'Authorization': `Token ${user.token || ''}`,
            'Content-Type': 'application/json'
        };
    }
    
    return { 'Content-Type': 'application/json' };
};

export const shortenURL = async (originalURL) => {
    try {
        const user = authService.getCurrentUser();
        
        const requestData = { 
            original_url: originalURL,
            user_id: user ? user.id : null
        };
        
        const response = await axios.post(
            BASE_URL, 
            requestData, 
            { 
                headers: getAuthHeaders(),
                withCredentials: true
            }
        );
        
        return response.data;
    } catch (error) {
        console.error('Error shortening URL:', error);
        throw error;
    }
};

export const fetchURLs = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: getAuthHeaders(),
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching URLs:', error);
        throw error;
    }
};