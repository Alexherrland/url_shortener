import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'lucide-react';
import { shortenURL } from '../services/urlService';

export default function URLShortener() {
    const [originalURL, setOriginalURL] = useState('');
    const [shortenedURL, setShortenedURL] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            const response = await shortenURL(originalURL);
            const shortCode = response.short_code;
            setShortenedURL(`http://localhost:8000/${shortCode}`);
        } catch (err) {
            setError('Error acortando la URL. Inténtalo de nuevo.');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedURL);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-4 md:mb-6"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">URL Shortener</h2>
                <p className="text-sm md:text-base text-gray-600">
                    Convierte URLs largas en enlaces cortos y fáciles de compartir
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center border-2 border-gray-300 rounded-md overflow-hidden">
                    <div className="p-2 md:p-3 bg-gray-100">
                        <Link className="text-gray-500 w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <input 
                        type="url" 
                        value={originalURL}
                        onChange={(e) => setOriginalURL(e.target.value)}
                        placeholder="Ingresa tu URL larga aquí"
                        required
                        className="w-full p-2 md:p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 md:py-3 rounded relative text-sm md:text-base">
                        {error}
                    </div>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-md hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                    Acortar URL
                </motion.button>
            </form>

            {shortenedURL && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 md:mt-6 bg-green-50 border border-green-200 rounded-md p-3 md:p-4 flex flex-col md:flex-row justify-between items-center"
                >
                    <span className="text-green-800 truncate mb-2 md:mb-0 md:mr-4 text-sm md:text-base">
                        {shortenedURL}
                    </span>
                    <button 
                        onClick={copyToClipboard}
                        className="bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-md hover:bg-green-700 text-sm md:text-base w-full md:w-auto"
                    >
                        Copiar
                    </button>
                </motion.div>
            )}
        </div>
    );
}