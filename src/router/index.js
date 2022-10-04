import { createRouter, createWebHistory } from 'vue-router'
import PokemonList from '../views/pokemon/List.vue'
import PokemonLayout from '../views/pokemon/Layout.vue'
import PokemonDetails from '../views/pokemon/Details.vue'
import About from '../views/About.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'
import PokemonService from '@/services/PokemonService.js'
import GlobalStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'PokemonList',
    component: PokemonList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonLayout',
    props: true,
    component: PokemonLayout,
    beforeEnter: to => {
      return PokemonService.getPokemon(to.params.id)
        .then(response => {
          console.log(response)
          GlobalStore.pokemon = response.data
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource',
              params: { resource: 'pokemon' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    children: [
      {
        path: '',
        name: 'PokemonDetails',
        component: PokemonDetails
      }
    ]
  },
  {
    path: '/pokemon/:afterEvent(.*)',
    redirect: to => {
      return { path: '/pokemons/' + to.params.afterEvent }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
