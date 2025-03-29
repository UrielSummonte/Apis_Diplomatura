const FAVORITES_KEY = "rickAndMortyFavorites"

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error("Error getting favorites from localStorage:", error)
    return []
  }
}

export const addToFavorites = (character) => {
  try {
    const favorites = getFavorites();

    const exists = favorites.some((fav) => fav.id === character.id);
    if (exists) {
      console.warn(`El personaje con ID ${character.id} ya está en favoritos.`);
      return favorites; 
    }

    favorites.push(character); 

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return [];
  }
};

export const removeFromFavorites = (characterId) => {
  try {
    const favorites = getFavorites()
    const updatedFavorites = favorites.filter((character) => character.id !== characterId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
    return updatedFavorites
  } catch (error) {
    console.error("Error removing from favorites:", error)
    return []
  }
}

export const deleteFavorites = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);  
    return [];  
  } catch (error) {
    console.error("Error cleaning favorites:", error);
    return [];
  }
}

