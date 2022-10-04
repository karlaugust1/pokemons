<template>
  <h1>Oops!</h1>
  <h3>The {{ resource }} you're looking for does not exists.</h3>
  <router-link :to="{ name: 'PokemonList' }">Back to the home page</router-link>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page'
    }
  }
}
</script>
