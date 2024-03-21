const fetchAllPokemons = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1400`)
        if (!response.ok) { throw new Error('Response.ok = false') }
        const data = await response.json()
        return data.results
    }
    catch (error) { console.log(error) }
}

const filterResults = (results, search) => results.filter(pokemon => pokemon.name.startsWith(search))

const printPokemon = (result) => {
    result.forEach(pokemon => {
        <div>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>Nombre: {pokemon.name}</p>
        </div>
    })
}

export { fetchAllPokemons, filterResults, printPokemon }