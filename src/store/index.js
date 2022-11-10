import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem('token'),
    role:'',
    region:'',
         },
  getters: {
  },
  mutations: {
    changeRole(state,payload){
     return state.role = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
