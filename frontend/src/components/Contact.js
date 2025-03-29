import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // not implemented
        console.log('Form submitted:', formData);
        setSubmitted(true);
    };
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <header className="bg-gray-900 text-white py-4">
                <div className="container mx-auto flex items-center px-4">
                    <button 
                        onClick={() => navigate('/')}
                        className="mr-4 text-white hover:text-blue-300"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold">Contacto</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
                <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Contáctanos</h1>
                    
                    {submitted ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded-md mb-6">
                            <h3 className="text-lg font-semibold mb-2">¡Mensaje enviado con éxito!</h3>
                            <p>Gracias por contactarnos. Responderemos a tu mensaje lo antes posible.</p>
                            <button 
                                onClick={() => setSubmitted(false)}
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                                <p className="text-blue-800">
                                    Puedes enviarnos un mensaje utilizando el formulario a continuación o escribirnos directamente a:{" "}
                                    <a href="mailto:herreriasramireza@gmail.com" className="font-medium text-blue-600 hover:underline">
                                        herreriasramireza@gmail.com
                                    </a>
                                </p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Asunto
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <Send size={18} className="mr-2" />
                                        Enviar Mensaje
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Información de Contacto</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                                <p className="text-blue-600">
                                    <a href="mailto:herreriasramireza@gmail.com">
                                        herreriasramireza@gmail.com
                                    </a>
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="font-medium text-gray-900 mb-2">Desarrollador</h3>
                                <p className="text-gray-700">Alex Herrerias Ramirez</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-900 text-white py-4 md:py-8 text-center mt-auto">
                <div className="container mx-auto px-4">
                    <p className="text-sm md:text-base">
                        &copy; 2025 URL Shortener - Alex Herrerias Ramirez
                    </p>
                </div>
            </footer>
        </div>
    );
}