import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({ key: 'epidemiweb', storage: localStorage })

export default new Vuex.Store({
  plugins: [ vuexPersist.plugin ],
  state: {
    isLogged: false,
    token: "",
    groups: [],
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getGroups(state) {
      return state.groups
    }
  },
  mutations: {
    setToken(state, payload) {
      state.isLogged = true
      state.token = payload
    },
    setGroups(state, payload) {
      state.groups = payload
    },
    setIsLogged(state, payload) {
      state.isLogged = payload
    }
  },
  actions: {

  },
  modules: {
  }
})
