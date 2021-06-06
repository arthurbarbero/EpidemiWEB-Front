import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/registerIncidence',
    name: 'RegisterIncidence',
    component: () => import('../views/RegisterIncidence.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registerSymptom',
    name: 'RegisterSymptom',
    component: () => import('../views/RegisterSymptoms')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/registerAgent',
    name: 'RegisterAgent',
    component: () => import('../views/RegisterAgent.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes 
})

router.beforeEach((to, from, next) => {
  if (!store.state.isLogged) {
    if (to.name === "Login" || to.name === "Register") {
      next()
    } else {
      next({ name : "Login" })
    }
  } else if (to.name === "Login" || to.name === "Register") {
    next({ name: "Home" })
  } else {
    next()
  }
  if (store.state.token) axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`
})

export default router
