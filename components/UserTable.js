'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Edit2, Trash2, Plus, UserCheck, UserX } from 'lucide-react'

export default function UserTable({ users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers)
  const [isLoading, setIsLoading] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const supabase = createClient()

  const handleToggleRole = async (userId, currentRole) => {
    setIsLoading(true)
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin'
      
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error

      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ))
    } catch (error) {
      alert('Error al cambiar el rol: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return
    
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)

      if (error) throw error

      setUsers(users.filter(user => user.id !== userId))
    } catch (error) {
      alert('Error al eliminar usuario: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setShowModal(true)
  }

  const handleSaveUser = async (userData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', editingUser.id)

      if (error) throw error

      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...userData } : user
      ))
      setShowModal(false)
      setEditingUser(null)
    } catch (error) {
      alert('Error al actualizar usuario: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Lista de Usuarios ({users.length})
        </h3>
      </div>
      
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {user.full_name || 'Sin nombre'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleRole(user.id, user.role)}
                    disabled={isLoading}
                    className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                    title={user.role === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                  >
                    {user.role === 'admin' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Editar usuario"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={isLoading}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    title="Eliminar usuario"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Edición */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Editar Usuario
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                handleSaveUser({
                  full_name: formData.get('full_name'),
                  email: formData.get('email')
                })
              }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    defaultValue={editingUser.full_name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingUser.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingUser(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}