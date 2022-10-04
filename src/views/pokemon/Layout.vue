<template>
  <div v-if="GlobalStore.pokemon">
    <h1>{{ GlobalStore.pokemon.name }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'PokemonDetails' }">Details</router-link>
    </div>
    <router-view :pokemon="GlobalStore.pokemon" />
  </div>
</template>

<script>
export default {
  inject: ['GlobalStore'],
}
</script>
