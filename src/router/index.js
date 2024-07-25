import Vue from 'vue'
import VueRouter from 'vue-router'
import MyCity from "@/views/MyCity.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter)

const routes = [

  { path: '/', name: 'home', component: Home },
  { path: '/city', name: 'city', component:MyCity },
  {path: '/register',name: 'myregister', component: ()=> import('../views/MyRegister.vue')},
  { path: '/floor', name: 'Floor', component:()=>import('../views/Floor.vue') },
  {path: '/region',name: 'region', component: ()=> import('../views/Region.vue')},
  {path: '/educational',name: 'educational', component: ()=> import('../views/Educational.vue')},
  {path: '/nationality',name: 'nationality', component: ()=> import('../views/Nationality.vue')},
  {path: '/personalforms',name: 'personalforms', component: ()=> import('../views/PersonalForms.vue')},
  {path: '/dr',name: 'dr',component: ()=> import('../views/Dr.vue')},
  {path: '/yd',name: 'yd',component: ()=> import('../views/Yd.vue')},
  {path: '/secondwar',name: 'secondwar', component: ()=> import('../views/SecondWar.vue')},
  {path: '/companion',name: 'Companion', component: ()=> import('../views/Companion.vue')},
  {path: '/awardees',name: 'Awardees', component: ()=> import('../views/Awardees.vue')},
  {path: '/conscripts',name: 'Conscripts', component: ()=> import('../views/Conscripts.vue')},
  {path: '/invalids',name: 'Invalids', component: ()=> import('../views/Invalids.vue')},
  {path: '/others',name: 'Others', component: ()=> import('../views/Others.vue')},
  {path: '/siblings',name: 'Siblings', component: ()=> import('../views/Siblings.vue')},
  {path: '/wareor',name: 'Wareor', component: ()=> import('../views/Wareor.vue')},
  { path: '/district', name: 'district', component: () => import(/* webpackChunkName: "about" */ '../views/MyDistrict.vue')},
  { path: '/users', name: 'users', component: () => import(/* webpackChunkName: "about" */ '../views/MyUsers.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
