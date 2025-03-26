import { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import { getFavorites, addToFavorites, removeFromFavorites, deleteFavorites } from "../utils/localStorage"

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(getFavorites() || [])

  useEffect(() => {
    setFavorites(getFavorites() || [])
  }, [])

  const isFavorite = useCallback(
    (id) => {
      return favorites.some((fav) => fav.id === id)
    },
    [favorites],
  )

  const toggleFavorite = useCallback(
    (character, description = "") => {
      const characterId = character.id

      if (isFavorite(characterId)) {
        removeFromFavorites(characterId)
        setFavorites((prev) => prev.filter((fav) => fav.id !== characterId))
        toast.info(`${character.name} eliminado de favoritos`)
      } else {
        const characterWithDescription = {
          ...character,
          description: description || "No hay descripción agregada.",
        }
        addToFavorites(characterWithDescription)
        setFavorites((prev) => [...prev, characterWithDescription])
        toast.success(`¡${character.name} agregado a favoritos!`)
      }
    },
    [favorites, isFavorite],
  )

  const updateDescription = useCallback(
    (id, description) => {
      const character = favorites.find((fav) => fav.id === id)

      if (character) {
        const updatedCharacter = { ...character, description }
        const updatedFavorites = favorites.map((fav) => (fav.id === id ? updatedCharacter : fav))

        setFavorites(updatedFavorites)
        addToFavorites(updatedCharacter)
        toast.success(`Descripción actualizada para ${character.name}`)
      }
    },
    [favorites],
  )

   // Nueva función para vaciar la lista de favoritos
   const clearFavorites = () => {
    deleteFavorites()  // Limpiar los favoritos en localStorage
    setFavorites([])   // Limpiar el estado de favoritos
    toast.info("Todos los favoritos han sido eliminados.")
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    updateDescription,
    clearFavorites,
  }
}

