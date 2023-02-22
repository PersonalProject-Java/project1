import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:sessionStorage.getItem('token'),
    role:'',
    region:'',
    regionid:'',
    fullname:'',
         },
  getters: {
  },
  mutations: {
    changeRole(state,payload){
     return state.role = payload
    },    setregionid(state,payload){
     return state.regionid = payload
    },
    setFullName(state,payload){
      return state.fullname = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
