import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPokemons(perPage, offset) {
    return apiClient.get('/pokemon?limit=' + perPage + '&offset=' + offset)
  },
  getPokemon(id) {
    return apiClient.get('/pokemon/' + id)
  }
}
