const { reactive, computed, toRefs } = require('vue')
import PokemonService from '@/services/PokemonService.js'

export default function usePokemonsSpace(page) {
  const data = reactive({
    pokemons: null,
    totalPokemons: 0,
    hasNextPage: computed(() => {
      var totalPages = Math.ceil(data.totalPokemons / 2)

      return page < totalPages
    })
  })

  function getPokemons(page) {
    PokemonService.getPokemons(20, page).then(response => {
      console.log(response)
      data.pokemons = response.data.results.map(pokemon => ({
        id: pokemon.url.split('pokemon')[1].replaceAll('/', ''),
        name: pokemon.name,
        url: pokemon.url
      }))
      data.totalPokemons = response.data.count
    })
  }

  return { ...toRefs(data), getPokemons }
}
