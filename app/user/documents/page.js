import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Download, FileText, Calendar } from 'lucide-react'

export default async function UserDocuments() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: files } = await supabase
    .storage
    .from('documents')
    .list('', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' }
    })

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    const iconMap = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️'
    }
    return iconMap[extension] || '📎'
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const downloadFile = async (fileName) => {
    const { data } = await supabase
      .storage
      .from('documents')
      .download(fileName)
    
    if (data) {
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Documentos</h1>
          <p className="text-gray-600 mt-2">Accede a todos tus documentos privados</p>
        </div>

        {files && files.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {files.map((file) => (
                <li key={file.name} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">{getFileIcon(file.name)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {file.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(file.created_at).toLocaleDateString()}
                          </span>
                          {file.metadata?.size && (
                            <span>{formatFileSize(file.metadata.size)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => downloadFile(file.name)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay documentos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Aún no se han subido documentos para tu acceso.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}