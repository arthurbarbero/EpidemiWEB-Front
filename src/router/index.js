import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes 
})

router.beforeEach((to, from, next) => {
  if (!store.state.isLogged && to.name !== "Login") {
    console.log("primeiro")
    console.log(store.state.isLogged)
    next({ name: "Login" })
  } else if (to.name === "Login" && store.state.isLogged) {
    console.log("segundo")
    console.log(store.state.isLogged)

    next({ name: "Home" })
  } else {
    console.log("terceiro")
    console.log(store.state.isLogged)

    next()
  }
})

export default router
