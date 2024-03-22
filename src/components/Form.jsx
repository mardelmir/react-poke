import { useState, useEffect } from 'react'
import { fetchAllPokemons, filterResults, fetchResults } from '../utils/apiFunctions'

function Form() {
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
}

export default Form