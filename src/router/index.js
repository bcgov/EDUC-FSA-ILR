import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Glossary from '../views/Glossary.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/glossary',
    name: 'Glossary',
    component: Glossary
  }
]

const router = new VueRouter({
  routes
})

export default router
