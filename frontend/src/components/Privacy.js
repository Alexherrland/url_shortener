import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
    const navigate = useNavigate();
    
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
                    <h1 className="text-xl font-bold">Política de Privacidad</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
                <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
                    
                    <div className="space-y-6 text-gray-700">
                        <p>
                            Última actualización: 29 de marzo de 2025
                        </p>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">1. Información que recopilamos</h2>
                        <p>
                            En URL Shortener, recopilamos información necesaria para proporcionar y mejorar nuestro servicio de acortamiento de URLs. Esta información puede incluir:
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Información de registro como nombre de usuario, correo electrónico y contraseña encriptada</li>
                            <li>URLs originales que deseas acortar</li>
                            <li>Información de uso como clics en enlaces acortados</li>
                            <li>Información del dispositivo y navegador para optimización del servicio</li>
                        </ul>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">2. Cómo utilizamos tu información</h2>
                        <p>
                            Utilizamos la información recopilada para:
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Proporcionar nuestro servicio de acortamiento de URLs</li>
                            <li>Mantener tu cuenta y datos asociados</li>
                            <li>Mejorar y optimizar nuestro servicio</li>
                            <li>Enviar notificaciones relacionadas con tu cuenta cuando sea necesario</li>
                        </ul>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">3. Protección de datos</h2>
                        <p>
                            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar una seguridad absoluta.
                        </p>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">4. Compartición de datos</h2>
                        <p>
                            No vendemos ni compartimos tus datos personales con terceros, excepto:
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Con tu consentimiento</li>
                            <li>Para cumplir con obligaciones legales</li>
                            <li>Para proteger nuestros derechos o propiedad</li>
                        </ul>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">5. Contacto</h2>
                        <p>
                            Si tienes preguntas o comentarios sobre nuestra política de privacidad, puedes contactarnos en: 
                            <a href="mailto:herreriasramireza@gmail.com" className="text-blue-600 hover:underline">herreriasramireza@gmail.com</a>
                        </p>
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