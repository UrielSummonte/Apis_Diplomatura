import { useState } from 'react'
import { Heart, X } from 'lucide-react'
import { useFavoritesContext } from '../context/FavoritesContext'

const CharacterCard = ({ character, showRemoveButton = false }) => {
  const { isFavorite, toggleFavorite, updateDescription } =
    useFavoritesContext()
  const [description, setDescription] = useState(character.description || '')
  const [isEditing, setIsEditing] = useState(false)

  const isCharacterFavorite = isFavorite(character.id)

  const handleToggleFavorite = () => {
    toggleFavorite(character, description)
  }

  const saveDescription = () => {
    updateDescription(character.id, description)
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isCharacterFavorite ? 'bg-red-500' : 'bg-gray-200'
          }`}
        >
          <Heart
            className={`h-5 w-5 ${
              isCharacterFavorite ? 'text-white fill-current' : 'text-gray-600'
            }`}
          />
        </button>

        {showRemoveButton && (
          <button
            onClick={handleToggleFavorite}
            className="absolute top-2 left-2 p-2 rounded-full bg-gray-200"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{character.name}</h3>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div>
            <span className="font-medium">Estado:</span> {character.status}
          </div>
          <div>
            <span className="font-medium">Especie:</span> {character.species}
          </div>
          <div>
            <span className="font-medium">Género:</span> {character.gender}
          </div>
          <div>
            <span className="font-medium">Origen:</span> {character.origin.name}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Descripción:</h4>
            {isCharacterFavorite ? (
              !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-purple-600 hover:text-purple-800 cursor-pointer"
                >
                  Editar
                </button>
              )
            ) : (
              <button
              onClick={() => setIsEditing(false)}
                className="text-xs text-purple-300 disabled:"
              >
                Editar
              </button>
            )}
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
                placeholder="Agrega una descripción para este personaje..."
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-xs bg-gray-200 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveDescription}
                  className="px-3 py-1 text-xs bg-purple-600 text-white rounded-md"
                >
                  Guardar
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">
              {description || 'No hay descripción agregada.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CharacterCard
