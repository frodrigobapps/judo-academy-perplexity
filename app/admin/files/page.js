import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import FileUpload from '@/components/FileUpload'

export default async function AdminFiles() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/user')

  const { data: files } = await supabase
    .storage
    .from('documents')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Archivos</h1>
          <p className="text-gray-600 mt-2">Sube y administra los documentos del sistema</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <FileUpload />
          </div>
          
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Archivos Subidos ({files?.length || 0})
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {files?.map((file) => (
                  <div key={file.name} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(file.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Descargar
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Eliminar
                      </button>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-8">No hay archivos subidos</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}