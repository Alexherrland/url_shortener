import axios from 'axios';
import authService from './authService';

const BASE_URL = 'http://localhost:8000/api/urls/';

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return token 
        ? { 'Authorization': `Token ${token}` }
        : {};
};

export const shortenURL = async (originalURL) => {
    try {
        const response = await axios.post(BASE_URL, 
            { original_url: originalURL }, 
            { headers: getAuthHeaders() }
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
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching URLs:', error);
        throw error;
    }
};