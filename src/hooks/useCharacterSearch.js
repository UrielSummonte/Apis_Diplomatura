import { useState } from 'react'
import { toast } from 'react-toastify'
import { searchCharacters } from '../services/api'

export const useCharacterSearch = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchForCharacters = async (searchTerm, count = 20) => {
    if (!searchTerm.trim()) {
      toast.error('Por favor ingresa un término de búsqueda')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await searchCharacters(searchTerm, count)

      if (JSON.stringify(data) === JSON.stringify(characters)) {
        return
      }

      setCharacters(data)

      if (data.length === 0) {
        toast.info('No se encontraron personajes con ese nombre')
      } else {
        toast.success(`¡Se encontraron ${data.length} personajes!`)
      }
    } catch (error) {
      console.error('Error al buscar personajes:', error)
      toast.error('Error al obtener personajes. Por favor intenta de nuevo.')
      setError(error.message)
      setCharacters([])
    } finally {
      setLoading(false)
    }
  }

  return {
    characters,
    loading,
    error,
    searchForCharacters,
    setCharacters,
  }
}
