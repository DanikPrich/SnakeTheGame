import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/SnakeGame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'snake',
    component: () => import('../views/SnakeGame.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
