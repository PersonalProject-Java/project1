import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './interseptors/axios'
import {VueperSlides, VueperSlide} from 'vueperslides';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from "vuetify";
import VDatetimePicker from 'v-datetime-field'
Vue.component('menu-icon', MenuIcon);
Vue.config.productionTip = false
Vue.use(VueperSlides, VueperSlide);
Vue.use(VDatetimePicker)
Vue.use(Vuetify, {
  iconfont: 'md'
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
