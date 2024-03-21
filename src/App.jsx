import { useState, useEffect } from 'react'
import './App.css';
import { fetchAllPokemons, filterResults, printPokemon } from './utils/apiFunctions';



function App() {
  const [search, setSearch] = useState('')
  const [matchingResults, setMatchingResults] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const renderPokemon = async () => {
      setMatchingResults(null), 
      setLoading(false), 
      setError('')
      
      if (search !== '') {
        setLoading(true)
        const results = await fetchAllPokemons()
        const filteredResults = filterResults(results, search)

        // FIXME: Hace la búsqueda con el state ANTERIOR (mirar documentación de React para meter cleanup code) 
        results.length === 0 || filteredResults.length == 0
          ? (setError('Pokémon no encontrado'))
          : (setError(''), setMatchingResults([...filteredResults]))

        console.log(matchingResults)
        console.log(error)
      } else { setError('') }
    }
    renderPokemon()
    return () => { setMatchingResults(null), setLoading(false), setError('') }

  }, [search])


  return (
    <>
      <form>
        <label htmlFor='search'>Buscar Pokémon</label>
        <input type='text' name='search' value={search} onChange={(e) => { setSearch((e.target.value).toLowerCase().trim()) }} />
      </form>
      <div className='loading'>{loading}</div>
      {/* <div className='result'>{result}</div> */}
      <div className='error'>{error}</div>
    </>
  )
};

export default App;
