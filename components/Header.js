'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Menu, X, User, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profile)
      }
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              🥋 Academia Judo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary">
              Inicio
            </Link>
            <Link href="/sobre-nosotros" className="text-gray-600 hover:text-primary">
              Sobre Nosotros
            </Link>
            <Link href="/clases" className="text-gray-600 hover:text-primary">
              Clases
            </Link>
            <Link href="/contacto" className="text-gray-600 hover:text-primary">
              Contacto
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href={profile?.role === 'admin' ? '/admin' : '/user'}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {profile?.role === 'admin' ? 'Panel Admin' : 'Mi Área'}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-primary flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Salir
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Iniciar Sesión
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-primary">
                Inicio
              </Link>
              <Link href="/sobre-nosotros" className="block px-3 py-2 text-gray-600 hover:text-primary">
                Sobre Nosotros
              </Link>
              <Link href="/clases" className="block px-3 py-2 text-gray-600 hover:text-primary">
                Clases
              </Link>
              <Link href="/contacto" className="block px-3 py-2 text-gray-600 hover:text-primary">
                Contacto
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href={profile?.role === 'admin' ? '/admin' : '/user'}
                    className="block px-3 py-2 bg-primary text-white rounded-md"
                  >
                    {profile?.role === 'admin' ? 'Panel Admin' : 'Mi Área'}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <Link 
                  href="/login"
                  className="block px-3 py-2 bg-primary text-white rounded-md"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
