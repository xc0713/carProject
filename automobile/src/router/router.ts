import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Styles from '@/views/Styles.vue'

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
      path: '/Styles',
      name: 'Styles',
      component: Styles
    }
  ]
})
