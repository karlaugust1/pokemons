<template>
  <h1>All Pokemons at the grace</h1>
  <div class="pokemons">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
    />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'PokemonList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'PokemonList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard.vue'
import PokemonService from '@/services/PokemonService.js'
import { computed, reactive, toRefs } from 'vue'

export default {
  name: 'PokemonList',
  props: ['page'],
  components: {
    PokemonCard
  },
  // Composition API - Syntax version 1
  // setup(props) {
  //   const pokemons = ref(null)
  //   const totalPokemons = ref(0)

  //   function getPokemons(page) {
  //     PokemonService.getPokemons(20, page).then(response => {
  //       console.log(response)
  //       pokemons.value = response.data.results.map(pokemon => ({
  //         id: pokemon.url.split('pokemon')[1].replaceAll('/', ''),
  //         name: pokemon.name,
  //         url: pokemon.url
  //       }))
  //       totalPokemons.value = response.data.count
  //     })
  //   }

  //   const hasNextPage = computed(() => {
  //     var totalPages = Math.ceil(totalPokemons.value / 2)

  //     return props.page < totalPages
  //   })

  //   return { pokemons, totalPokemons, getPokemons, hasNextPage }
  // },
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   next(comp => {
  //     comp.getPokemons(parseInt(routeTo.query.page) || 0)
  //   }).catch(error => console.log('error', error))
  // },
  // beforeRouteUpdate(routeTo) {
  //   this.getPokemons(parseInt(routeTo.query.page) * 10 || 0)
  // }

  // Composition API - Syntax version 2
  setup(props) {
    const data = reactive({
      pokemons: null,
      totalPokemons: 0,
      hasNextPage: computed(() => {
        var totalPages = Math.ceil(data.totalPokemons / 2)

        return props.page < totalPages
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
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    next(comp => {
      comp.getPokemons(parseInt(routeTo.query.page) || 0)
    }).catch(error => console.log('error', error))
  },
  beforeRouteUpdate(routeTo) {
    this.getPokemons(parseInt(routeTo.query.page) * 10 || 0)
  }

  // Options API
  // data() {
  //   return {
  //     pokemons: null,
  //     totalPokemons: 0
  //   }
  // },
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   PokemonService.getPokemons(20, parseInt(routeTo.query.page) || 0)
  //     .then(response => {
  //       console.log(response)
  //       next(comp => {
  //         comp.pokemons = response.data.results.map(pokemon => ({
  //           id: pokemon.url.split('pokemon')[1].replaceAll('/', ''),
  //           name: pokemon.name,
  //           url: pokemon.url
  //         }))
  //         comp.totalPokemons = response.data.count
  //         console.log(comp)
  //       })
  //     })
  //     .catch(() => {
  //       next({ name: 'NetworkError' })
  //     })
  // },
  // beforeRouteUpdate(routeTo) {
  //   return PokemonService.getPokemons(20, parseInt(routeTo.query.page) * 10 || 0)
  //     .then(response => {
  //       this.pokemons = response.data.results.map(pokemon => ({
  //         id: pokemon.url.split('pokemon')[1].replaceAll('/', ''),
  //         name: pokemon.name,
  //         url: pokemon.url
  //       }))
  //       this.totalPokemons = response.data.count
  //     })
  //     .catch(() => {
  //       return { name: 'NetworkError' }
  //     })
  // },
  // computed: {
  //   hasNextPage() {
  //     var totalPages = Math.ceil(this.totalPokemons / 2)

  //     return this.page < totalPages
  //   }
  // }
}
</script>

<style scoped>
.pokemons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
