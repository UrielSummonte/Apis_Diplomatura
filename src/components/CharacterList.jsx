import { useMemo } from "react"
import CharacterCard from "./CharacterCard"
import { useFavoritesContext } from "../context/FavoritesContext"

const CharacterList = ({ characters }) => {
  const { isFavorite } = useFavoritesContext()

  const characterList = useMemo(() => {
    return characters.map((character) => ({
      ...character,
      isFavorite: isFavorite(character.id),
    }))
  }, [characters, isFavorite])

  if (characterList.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No hay personajes para mostrar. ¡Intenta buscar un personaje!</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Resultados de la Búsqueda</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characterList.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  )
}

export default CharacterList

