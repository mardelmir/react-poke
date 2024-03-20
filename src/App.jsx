import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([''])
  const [state, setSate] = useState('')
  const [error, setError] = useState('')

  //const handleSubmit = (e) => e.preventDefault()

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then(response => {
        if (response.status === 404) { setError('Pokèmon no encontrado') }
        else {
          setError('')
          return response.json()
        }
      })
      .then(data => {
        console.log(data)
        //data ? setResult([... { name: data.name, img: data.sprites.front_default }]) : setResult([])
      })
      .catch(error => {
        console.error(`Error: ${error}`)
        setError(error)
      })
  }, [search])

  const printPokemon = (result) => {
    <div>
      <p>{result[0]}</p>
      <img src={result[1]} alt={result[1]} />
    </div>
  }




  return (
    <>
      <form>
        <label htmlFor='search'>Buscar Pokèmon</label>
        <input type='text' name='search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
      </form>
      <div className='result'>{result}</div>
      <div className='error'>{error}</div>

    </>
  )
};

export default App;
