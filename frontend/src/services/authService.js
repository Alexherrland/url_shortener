import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/users/';

export const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${BASE_URL}login/`, { 
                username, 
                password 
            });
            
            // store the user info
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('is_admin', response.data.is_staff);
            
            return response.data.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    register: async (username, email, password, isAdmin = false) => {
        try {
            const response = await axios.post(`${BASE_URL}`, { 
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