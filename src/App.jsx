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

// 

// import { useState, useEffect } from "react";
// import searchPokemon from "../utils/functions";
// import PokemonData from "./components/PokemonData";
// import Input from "./components/Input"
// import "./App.css";


// function App() {
//   const [searchInput, setSearchInput] = useState("");
//   const [pokemonData, setPokemonData] = useState("");

//   useEffect(() => {
//     const pokeData = async () => {
//       const data = await searchPokemon(searchInput);
//       setPokemonData(data);
//       console.log(data);
//     };
//     pokeData();
//     setPokemonData("");
//   }, [searchInput]);

//   return (
//     <>
//       <h2>Buscador pokemon</h2>
//       <Input input={searchInput} setInput={setSearchInput} />
//       <PokemonData pokemonData={pokemonData} />
//     </>
//   );
// }

// export default App;
