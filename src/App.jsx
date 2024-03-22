import { useState, useEffect } from 'react'
import './App.css';
import { fetchAllPokemons, filterResults, fetchResults } from './utils/apiFunctions';

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
          const results = await fetchAllPokemons(search);
          const filtered = filterResults(results, search);
          const matchingPokemons = await fetchResults(filtered);
  
          if (matchingPokemons.length === 0) {
            setError('Pokémon no encontrado');
            setMatchingResults([]);
          } else {
            setError('');
            setMatchingResults(matchingPokemons);
          }
        } else {
          setError('');
          setMatchingResults([]);
        }
      } catch (error) {
        setError('Error al cargar los Pokémons: ' + error);
        setMatchingResults([]);
      }
  
      setLoading(false); 
    };
  
    renderPokemon();
  }, [search]); 
  
  return (
    <>
      <form>
        <label htmlFor='search'>Buscar Pokémon</label>
        <input type='text' name='search' value={search} onChange={(e) => { setSearch((e.target.value).toLowerCase().trim()) }} />
      </form>
      <div className='loading'>{loading}</div>
      <div className='matchingResults'>{matchingResults && (
        matchingResults.map((pokemon, i) =>
          <div key={i}>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>Nombre: {pokemon.name}</p>
            <p>Tipo: {pokemon.type.join(', ')}</p>
          </div>)
      )}</div>
      <div className='error'>{error}</div>
    </>
  )
};

export default App;

