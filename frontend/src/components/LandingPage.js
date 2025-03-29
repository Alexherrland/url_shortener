import React from 'react';
import URLShortener from "./URLShortener";
import URLList from "./URLList";
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const isAdmin = authService.isAdmin();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <header className="bg-gray-900 text-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-xl font-bold">URL Shortener</h1>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span>Bienvenido, {user.username}</span>
                                {isAdmin && <span className="text-yellow-300 text-sm">(Admin)</span>}
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => navigate('/login')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                >
                                    Iniciar Sesión
                                </button>
                                <button 
                                    onClick={() => navigate('/register')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                                >
                                    Registrarse
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 md:py-16 space-y-8 md:space-y-12 flex-grow">
                <section className="text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
                        Simplifica tus <span className="text-blue-600">URLs</span>
                    </h1>
                    <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                        Crea enlaces cortos, rastreables y personalizados en segundos.
                    </p>
                </section>

                <section className="px-2 md:px-0">
                    <URLShortener />
                </section>

                {user && (
                    <section className="px-2 md:px-0">
                        <URLList />
                    </section>
                )}
            </main>

            <footer className="bg-gray-900 text-white py-6 md:py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-bold mb-2">URL Shortener</h3>
                            <p className="text-sm text-gray-300 max-w-md">
                                Simplifica tus enlaces para compartirlos de manera más efectiva en todas tus redes sociales y comunicaciones.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
                            <a 
                                href="mailto:herreriasramireza@gmail.com" 
                                className="text-gray-300 hover:text-blue-300 transition-colors"
                            >
                                herreriasramireza@gmail.com
                            </a>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
                        <p className="text-sm md:text-base mb-4 md:mb-0">
                            &copy; 2025 URL Shortener - Alex Herrerias Ramirez. Todos los derechos reservados.
                        </p>
                        <div className="flex space-x-6 text-sm md:text-base">
                            <button 
                                onClick={() => navigate('/privacy')} 
                                className="text-gray-300 hover:text-blue-300 transition-colors"
                            >
                                Privacidad
                            </button>
                            <button 
                                onClick={() => navigate('/terms')} 
                                className="text-gray-300 hover:text-blue-300 transition-colors"
                            >
                                Términos
                            </button>
                            <button 
                                onClick={() => navigate('/contact')} 
                                className="text-gray-300 hover:text-blue-300 transition-colors"
                            >
                                Contacto
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}