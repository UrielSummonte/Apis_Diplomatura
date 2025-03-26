const API_BASE_URL = "https://rickandmortyapi.com/api"

export const searchCharacters = async (name, limit = 20) => {
  try {
    const response = await fetch(`${API_BASE_URL}/character/?name=${encodeURIComponent(name)}`)

    if (!response.ok) {
      if (response.status === 404) {
        return []
      }
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    return data.results.slice(0, limit)
  } catch (error) {
    console.error("Error fetching characters:", error)
    if (error.message.includes("404")) {
      return []
    }
    throw error
  }
}

export const getCharacterById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/character/${id}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error)
    throw error
  }
}

