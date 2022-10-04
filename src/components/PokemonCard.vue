<template>
  <router-link
    class="pokemon-link"
    :to="{ name: 'PokemonDetails', params: { id: pokemon.id } }"
  >
    <div class="pokemon-card">
      <h4>{{ pokemon.name }}</h4>
      <span>#{{ pokemon.id }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.pokemon-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.pokemon-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.pokemon-card h4 {
  text-transform: capitalize;
}

.pokemon-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
