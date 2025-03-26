"use client"

import { useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CharacterSearch from "./components/CharacterSearch"
import CharacterList from "./components/CharacterList"
import FavoritesList from "./components/FavoriteList"
import Loader from "./components/Loader"
import { FavoritesProvider } from "./context/FavoritesContext"
import { useCharacterSearch } from "./hooks/useCharacterSearch"

function App() {

  const { characters, loading, searchForCharacters } = useCharacterSearch()
  const [activeTab, setActiveTab] = useState("search")
  
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-purple-700 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Rick and Morty Explorer</h1>
            <p className="mt-2">Busca tus personajes favoritos de la serie</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex mb-6 border-b">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "search" ? "text-purple-700 border-b-2 border-purple-700" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("search")}
            >
              Buscar
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "favorites" ? "text-purple-700 border-b-2 border-purple-700" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favoritos
            </button>
          </div>

          {activeTab === "search" ? (
            <>
              <CharacterSearch onSearch={searchForCharacters} />
              {loading ? <Loader /> : <CharacterList characters={characters} />}
            </>
          ) : (
            <FavoritesList />
          )}
        </main>

        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="mt-2">Buscador de Personajes con datos proporcionados por la API de Rick and Morty</p>
          </div>
        </footer>

        <ToastContainer position="bottom-right" />
      </div>
    </FavoritesProvider>
  )
}

export default App
