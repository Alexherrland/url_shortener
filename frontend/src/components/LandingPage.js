import URLShortener from "../components/URLShortener";
import URLList from "../components/URLList";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
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

                <section className="px-2 md:px-0">
                    <URLList />
                </section>
            </main>

            <footer className="bg-gray-900 text-white py-4 md:py-8 text-center mt-auto">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm md:text-base mb-2 md:mb-0">
                        &copy; 2025 URL Shortener
                    </p>
                    <div className="flex space-x-4 text-sm md:text-base">
                        <a href="#" className="hover:text-blue-300">Privacidad</a>
                        <a href="#" className="hover:text-blue-300">Términos</a>
                        <a href="#" className="hover:text-blue-300">Contacto</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}