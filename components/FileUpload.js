'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Upload, File, X, CheckCircle } from 'lucide-react'

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState({})
  const fileInputRef = useRef(null)
  const supabase = createClient()

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    const newUploadStatus = {}

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileName = `${Date.now()}-${file.name}`
      
      try {
        newUploadStatus[i] = { status: 'uploading', progress: 0 }
        setUploadStatus({ ...newUploadStatus })

        const { error } = await supabase.storage
          .from('documents')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (error) throw error

        newUploadStatus[i] = { status: 'completed', progress: 100 }
        setUploadStatus({ ...newUploadStatus })
        
      } catch (error) {
        console.error('Error uploading file:', error)
        newUploadStatus[i] = { status: 'error', error: error.message }
        setUploadStatus({ ...newUploadStatus })
      }
    }

    setUploading(false)
    
    // Limpiar archivos completados después de 2 segundos
    setTimeout(() => {
      const completedIndexes = Object.entries(newUploadStatus)
        .filter(([_, status]) => status.status === 'completed')
        .map(([index, _]) => parseInt(index))
      
      setFiles(prev => prev.filter((_, index) => !completedIndexes.includes(index)))
      setUploadStatus({})
    }, 2000)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Subir Documentos
        </h3>
        
        {/* Zona de Drop */}
        <div
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${
            isDragging 
              ? 'border-primary bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-500 focus-within:outline-none"
              >
                <span>Sube archivos</span>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleFileSelect}
                />
              </label>
              <p className="pl-1">o arrastra y suelta</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, PDF, DOC hasta 10MB
            </p>
          </div>
        </div>

        {/* Lista de archivos seleccionados */}
        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Archivos seleccionados ({files.length})
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-2">
                    <File className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {uploadStatus[index] && (
                      <div className="flex items-center">
                        {uploadStatus[index].status === 'uploading' && (
                          <div className="text-xs text-blue-600">Subiendo...</div>
                        )}
                        {uploadStatus[index].status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {uploadStatus[index].status === 'error' && (
                          <div className="text-xs text-red-600">Error</div>
                        )}
                      </div>
                    )}
                    
                    {!uploading && (
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón de subida */}
        {files.length > 0 && (
          <div className="mt-4">
            <button
              onClick={uploadFiles}
              disabled={uploading}
              className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Subiendo archivos...' : `Subir ${files.length} archivo(s)`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}