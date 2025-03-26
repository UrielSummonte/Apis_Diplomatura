import { createContext, useContext, memo } from 'react'
import { useFavorites } from '../hooks/useFavorites'

const FavoritesContext = createContext()

export const FavoritesProvider = memo(({ children }) => {
  const favoritesData = useFavorites()

  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  )
})

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext)

  if (context === undefined) {
    throw new Error(
      'useFavoritesContext debe ser usado dentro de un FavoritesProvider'
    )
  }

  return context
}
