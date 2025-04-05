import CharacterCard from "./CharacterCard"
import { useFavoritesContext } from "../context/FavoritesContext"

const FavoritesList = () => {
  const { favorites, clearFavorites } = useFavoritesContext()

  const handleClearFavorites = () => {
    if (favorites.length > 0) {
      clearFavorites()  
      toast.info("Todos los favoritos han sido eliminados.")
    } else {
      toast.warn("No hay favoritos para eliminar.")
    }
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No has agregado ningún favorito todavía.</p>
        <p className="text-gray-600 mt-2">¡Busca personajes y haz clic en el ícono de corazón para agregarlos aquí!</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tus Personajes Favoritos</h2>
      <button
        onClick={handleClearFavorites}
        className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Eliminar todos los favoritos
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((character) => (
          <CharacterCard key={character.id} character={character} showRemoveButton={true} />
        ))}
      </div>
    </div>
  )
}

export default FavoritesList

