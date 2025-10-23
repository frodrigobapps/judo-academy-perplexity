import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Academia de Judo
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Descubre el arte marcial japonés en un ambiente profesional y familiar. 
              Clases para todas las edades y niveles.
            </p>
            <div className="space-x-4">
              <Link 
                href="/contacto"
                className="bg-secondary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
              >
                Solicitar Información
              </Link>
              <Link 
                href="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
              >
                Área Privada
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Características del Judo */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir el Judo?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              El judo es más que un deporte, es una filosofía de vida que desarrolla 
              el cuerpo, la mente y el espíritu.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥋</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Disciplina</h3>
              <p className="text-gray-600">
                Desarrolla autodisciplina, respeto y control mental a través de la práctica constante.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Forma Física</h3>
              <p className="text-gray-600">
                Mejora la fuerza, flexibilidad, coordinación y resistencia cardiovascular.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Valores</h3>
              <p className="text-gray-600">
                Aprende respeto, humildad, perseverancia y espíritu de superación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clases Disponibles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestras Clases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos clases adaptadas a diferentes edades y niveles de experiencia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Judo Infantil</h3>
                <p className="text-gray-600 mb-4">Para niños de 4 a 12 años. Enfoque en diversión y fundamentos básicos.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Lunes y Miércoles 17:00-18:00</li>
                  <li>• Sábados 10:00-11:00</li>
                  <li>• Precio: 40€/mes</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Judo Juvenil</h3>
                <p className="text-gray-600 mb-4">Para adolescentes de 13 a 17 años. Técnicas avanzadas y competición.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Martes y Jueves 18:00-19:30</li>
                  <li>• Sábados 11:00-12:30</li>
                  <li>• Precio: 50€/mes</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Judo Adultos</h3>
                <p className="text-gray-600 mb-4">Para adultos desde 18 años. Todos los niveles bienvenidos.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Lunes y Miércoles 19:30-21:00</li>
                  <li>• Viernes 19:00-20:30</li>
                  <li>• Precio: 55€/mes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para comenzar tu camino en el Judo?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y descubre todo lo que el judo puede ofrecerte.
          </p>
          <Link 
            href="/contacto"
            className="bg-secondary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
          >
            Contactar Ahora
          </Link>
        </div>
      </section>
    </div>
  )
}