import { useState } from 'react'

const CharacterSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [count, setCount] = useState(20)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!searchTerm.trim()) {
      setError('Por favor ingresa un término de búsqueda')
      return
    }

    setError('')
    onSearch(searchTerm, count)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Buscar Personajes</h2>
      
      {/* Mostrar errores si los hay */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Personaje
          </label>
          <input
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rick, Morty, Beth..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-describedby="searchTerm-help"
          />
          <p id="searchTerm-help" className="text-xs text-gray-500">Introduce un nombre para buscar personajes</p>
        </div>

        <div>
          <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Resultados (máx 20)
          </label>
          <input
            type="number"
            id="count"
            value={count}
            onChange={(e) => {
              const newCount = Math.min(20, Math.max(1, Number.parseInt(e.target.value) || 1))
              setCount(newCount)
            }}
            min="1"
            max="20"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-describedby="count-help"
          />
          <p id="count-help" className="text-xs text-gray-500">Selecciona un número entre 1 y 20</p>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Buscar
        </button>
      </form>
    </div>
  )
}

export default CharacterSearch
