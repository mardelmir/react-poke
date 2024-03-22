const fetchAllPokemons = async (search) => {
    if (search !== '')
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1400`)
            if (!response.ok) { throw new Error('Error: la solicitud para todos los pokémon no ha sido exitosa') }
            const data = await response.json()
            return data.results
        }
        catch (error) { console.log(error) }
}

const filterResults = (results, search) => {
    const match = results.filter(pokemon => pokemon.name.startsWith(search))
    return match.map(pokemon => pokemon.url)
}

const fetchResults = async (matchingPokemons) => {
    if (matchingPokemons.length !== 0) {
        const matchInfo = []
        for (let url of matchingPokemons) {
            try {
                const response = await fetch(url)
                if (!response.ok) { throw new Error('Error: la solicitud para las coincidencias no ha sido exitosa') }
                const data = await response.json()
                const info = {
                    name: data.name,
                    image: data.sprites.front_default,
                    type: data.types.map(e => e.type.name)
                }
                matchInfo.push(info)
            }
            catch (error) { console.log(error) }
        }
        return matchInfo
    }
}

export { fetchAllPokemons, filterResults, fetchResults }