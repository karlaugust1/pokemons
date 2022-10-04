<template>
  <p>#{{ pokemon.id }} {{ pokemon.name }}</p>
  <p>{{ pokemon.url }}</p>
</template>

<script>
export default {
  props: ['pokemon']
}
</script>
