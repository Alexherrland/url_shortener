import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/urls/';

export const shortenURL = async (originalURL) => {
    try {
        const response = await axios.post(BASE_URL, { original_url: originalURL });
        return response.data;
    } catch (error) {
        console.error('Error shortening URL:', error);
        throw error;
    }
};

export const fetchURLs = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching URLs:', error);
        throw error;
    }
};