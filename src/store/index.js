import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:sessionStorage.getItem('token'),
    role:'',
    region:'',
    regionid:'',
    cityid:'',
    districtid:'',
    fullname:'',
         },
  getters: {
  },
  mutations: {
    changeRole(state,payload){
     return state.role = payload
    },
    setregionid(state,payload){
     return state.regionid = payload
    },
    setcityid(state,payload){
     return state.cityid = payload
    },
    setdistrictid(state,payload){
     return state.districtid = payload
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
