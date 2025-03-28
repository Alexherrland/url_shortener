import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { fetchURLs } from '../services/urlService';
import authService from '../services/authService';

export default function URLList() {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const isAdmin = authService.isAdmin();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const loadURLs = async () => {
            try {
                const data = await fetchURLs();
                setUrls(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        loadURLs();
    }, []);

    const copyToClipboard = (shortURL) => {
        navigator.clipboard.writeText(`http://localhost:8000/${shortURL}`);
    };

    if (loading) {
        return <div className="text-center text-gray-600 text-sm md:text-base">Cargando...</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                {isAdmin ? 'Todos los Enlaces' : 'Mis URLs Acortadas'}
            </h2>
            {urls.length === 0 ? (
                <p className="text-center text-gray-600 text-sm md:text-base">No hay URLs acortadas aún</p>
            ) : (
                <div className="space-y-3 md:space-y-4">
                    {urls.map((url) => (
                        <div 
                            key={url.id} 
                            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-100 p-3 md:p-4 rounded-md"
                        >
                            <div className="flex-1 mb-2 md:mb-0 md:mr-4">
                                <p className="text-gray-800 font-medium text-sm md:text-base break-words overflow-hidden">
                                    Original: {url.original_url}
                                </p>
                                <p className="text-blue-600 font-semibold text-sm md:text-base break-words overflow-hidden">
                                    Acortado: http://localhost:8000/{url.short_code}
                                </p>
                                {isAdmin && (
                                    <p className="text-xs md:text-sm text-gray-500">
                                        Clicks: {url.clicks}
                                    </p>
                                )}
                            </div>
                            <div className="flex space-x-2 self-end md:self-auto">
                                <button 
                                    onClick={() => copyToClipboard(url.short_code)}
                                    className="text-gray-600 hover:text-blue-600"
                                >
                                    <Copy size={isMobile ? 16 : 20} />
                                </button>
                                <a 
                                    href={`http://localhost:8000/${url.short_code}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-green-600"
                                >
                                    <ExternalLink size={isMobile ? 16 : 20} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}