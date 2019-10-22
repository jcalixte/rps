import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/play/:id',
    name: 'play',
    props: true,
    component: () => import('@/views/Play.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
