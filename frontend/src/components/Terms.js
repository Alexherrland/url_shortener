import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Terms() {
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
                    <h1 className="text-xl font-bold">Términos de Servicio</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
                <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Términos de Servicio</h1>
                    
                    <div className="space-y-6 text-gray-700">
                        <p>
                            Última actualización: 29 de marzo de 2025
                        </p>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">1. Aceptación de los Términos</h2>
                        <p>
                            Al acceder o utilizar el servicio URL Shortener, aceptas estar legalmente vinculado por estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar nuestro servicio.
                        </p>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">2. Descripción del Servicio</h2>
                        <p>
                            URL Shortener es un servicio que permite a los usuarios acortar URLs largas para facilitar su compartición. Nos reservamos el derecho de modificar o discontinuar, temporal o permanentemente, el servicio con o sin previo aviso.
                        </p>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">3. Registro de Cuenta</h2>
                        <p>
                            Para acceder a ciertas funcionalidades de URL Shortener, deberás registrarte y crear una cuenta. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.
                        </p>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">4. Uso Aceptable</h2>
                        <p>
                            Aceptas no utilizar URL Shortener para:
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Acortar URLs que contengan material ilegal o que viole derechos de terceros</li>
                            <li>Distribuir malware, spam o contenido engañoso</li>
                            <li>Intentar dañar o interferir con la operación normal del servicio</li>
                            <li>Recopilar información de otros usuarios sin su consentimiento</li>
                        </ul>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">5. Limitación de Responsabilidad</h2>
                        <p>
                            URL Shortener y sus desarrolladores no serán responsables por cualquier daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar nuestro servicio.
                        </p>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">6. Modificaciones</h2>
                        <p>
                            Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. El uso continuado del servicio después de tales modificaciones constituirá tu aceptación de los nuevos términos.
                        </p>
                        
                        <h2 className="text-xl font-semibold text-gray-800 mt-6">7. Contacto</h2>
                        <p>
                            Si tienes preguntas sobre estos Términos de Servicio, puedes contactarnos en: 
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