import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">🥋 Academia de Judo</h3>
            <p className="text-gray-300 mb-4">
              Formando judokas con disciplina, respeto y técnica desde hace más de 20 años.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/sobre-nosotros" className="text-gray-300 hover:text-white">Sobre Nosotros</Link></li>
              <li><Link href="/clases" className="text-gray-300 hover:text-white">Clases</Link></li>
              <li><Link href="/contacto" className="text-gray-300 hover:text-white">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📍 Calle del Dojo, 123</li>
              <li>📞 +34 123 456 789</li>
              <li>✉️ info@academiajudo.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Academia de Judo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}