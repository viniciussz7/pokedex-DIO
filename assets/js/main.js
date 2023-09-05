const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")

const maxRecords = 151 //primeira geração de pokemons
const limit = 12
let offset = 0

function loadPokemonsItem(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                    <ol class="types">
                            ${pokemon.types.map((type) =>`<li class="type ${pokemon.type}">${type}</li>`).join("")}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
            </li>
        `).join("") //listPokemonsJson -> listPokemonsHtml no separation
    })    
}

loadPokemonsItem()
    
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNext = offset + limit
    if (qtdRecordNext >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonsItem(offset, newLimit)

        loadMoreButton.parentElement.remove(loadMoreButton)
    } else {
        loadPokemonsItem(offset, limit)
    }
})
