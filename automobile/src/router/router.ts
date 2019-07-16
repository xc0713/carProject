import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import quotation from '@/views/quotation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/offical',
      name: 'offical',
      component: () => import('@/views/official.vue')
    },{
      　path:'/quotation',
        name: 'quotation',
        component: quotation
    }
  ]
})
