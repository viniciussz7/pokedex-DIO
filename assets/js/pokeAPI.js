
const pokeApi = {}

function convertPokemonApiToPokemonModel(pokemonDetail) {
    const pokemon = new PokemonModel()
    pokemon.number = pokemonDetail.order
    pokemon.name = pokemonDetail.name
    const types = pokemonDetail.types.map((types) => types.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonApiToPokemonModel)
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((datailsRequests) => Promise.all(datailsRequests))
        .then((pokemonsDatails) => pokemonsDatails)
}