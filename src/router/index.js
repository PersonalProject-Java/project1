import Vue from 'vue'
import VueRouter from 'vue-router'
import MyCity from "@/views/MyCity.vue";
import Home from "@/views/Home.vue";
import MyLogin from "@/views/MyLogin.vue";

Vue.use(VueRouter)

const routes = [

  { path: '/', name: 'home', component: Home },
  { path: '/city', name: 'city', component:MyCity },
  { path: '/login', name: 'login', component:MyLogin },
  { path: '/floor', name: 'Floor', component:()=>import('../views/Floor.vue') },
  {path: '/region',name: 'region',component: ()=> import('../views/Region.vue')},
  {path: '/educational',name: 'educational',component: ()=> import('../views/Educational.vue')},
  {path: '/nationality',name: 'nationality',component: ()=> import('../views/Nationality.vue')},
  {path: '/personalforms',name: 'personalforms',component: ()=> import('../views/PersonalForms.vue')},
  { path: '/district', name: 'district',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MyDistrict.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
