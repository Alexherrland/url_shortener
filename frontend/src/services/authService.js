import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/users/';

// Create axios instance with default config
const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const authService = {
    login: async (username, password) => {
        try {
            const response = await api.post(`${BASE_URL}login/`, { 
                username, 
                password 
            });
            
            // store the user info with token for API calls
            const userData = {
                ...response.data.user,
                token: response.data.token // Store token if your backend sends one
            };
            
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('is_admin', response.data.is_staff);
            
            return userData;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    register: async (username, email, password, isAdmin = false) => {
        try {
            const response = await api.post(`${BASE_URL}`, { 
                username, 
                email, 
                password,
                is_admin: isAdmin
            });
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('is_admin');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAdmin: () => {
        return localStorage.getItem('is_admin') === 'true';
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    }
};

export default authService;