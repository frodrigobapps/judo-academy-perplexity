import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, FileText, Upload, Settings } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/user')

  // Obtener estadísticas
  const { count: usersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'user')

  const { count: filesCount } = await supabase
    .storage
    .from('documents')
    .list('', { count: 'exact' })

  const stats = [
    {
      name: 'Usuarios Totales',
      value: usersCount || 0,
      icon: Users,
      color: 'bg-blue-500',
      href: '/admin/users'
    },
    {
      name: 'Documentos',
      value: filesCount || 0,
      icon: FileText,
      color: 'bg-green-500',
      href: '/admin/files'
    },
    {
      name: 'Subir Archivos',
      value: 'Gestionar',
      icon: Upload,
      color: 'bg-purple-500',
      href: '/admin/files'
    },
    {
      name: 'Configuración',
      value: 'Sistema',
      icon: Settings,
      color: 'bg-orange-500',
      href: '/admin/settings'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Bienvenido, {profile?.full_name || user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-primary">Ver detalles →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Acciones Rápidas
              </h3>
              <div className="mt-5 space-y-3">
                <Link
                  href="/admin/users"
                  className="w-full bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 block"
                >
                  Gestionar Usuarios
                </Link>
                <Link
                  href="/admin/files"
                  className="w-full bg-green-600 text-white text-center px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 block"
                >
                  Subir Documentos
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Actividad Reciente
              </h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                              <Users className="w-4 h-4 text-white" />
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div>
                              <p className="text-sm text-gray-500">
                                Sistema iniciado correctamente
                              </p>
                              <p className="text-xs text-gray-400">Hace 2 minutos</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}