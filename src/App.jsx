import { useState, useEffect } from 'react'
import { fetchAllPokemons, filterResults, fetchResults } from './utils/apiFunctions';
import './App.css';

function App() {
  const [search, setSearch] = useState('')
  const [matchingResults, setMatchingResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const renderPokemon = async () => {
      setLoading(true);

      try {
        if (search !== '') {
          const results = await fetchAllPokemons(search)
          const filtered = filterResults(results, search)
          const matchingPokemons = await fetchResults(filtered)

          matchingPokemons == null || matchingPokemons.length === 0
            ? (setError('Pokémon no encontrado'), setMatchingResults([]))
            : (setError(''), setMatchingResults(matchingPokemons))

        } else {
          setError('')
          setMatchingResults([])
        }
      } catch (error) {
        console.log(error)
        setError('Pokémon no encontrado')
        setMatchingResults([])
      }

      setLoading(false)
    }

    renderPokemon()
  }, [search])

  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase().trim())

  return (
    <>
      <header className='header'>
        <img className='logo' src='./public/pokemon_logo.png' alt='logo' />
        <form className='form'>
          <label htmlFor='search'>Buscar Pokémon</label>
          <input type='text' name='search' value={search} placeholder='Introduce tu pokemon' onChange={handleSearchChange} />
        </form>
      </header>

      <div className='loading'>{loading === true && ('Loading...')}</div>
      <div className='matchingResults'>{matchingResults && (
        matchingResults.map((pokemon, i) =>
          <div className='pokemon' key={i}>
            <img src={pokemon.image} alt={pokemon.name} />
            <div className='info'>
              <p><span>Nombre:</span> {pokemon.name}</p>
              <p><span>Tipo:</span> {pokemon.type.join(', ')}</p>
            </div>
          </div>)
      )}</div>
      <div className='error'>{error}</div>
    </>
  )
};

export default App;