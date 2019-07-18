import Vue from 'vue'
import Router from 'vue-router';
import Home from '../views/Home.vue';
import quotation from '../views/quotation.vue';
import Styles from '../views/Styles.vue';
import offical from '../views/official.vue';
import allCarStyle from '../views/allCarStyle.vue';

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
      component:offical
    },{
      　path:'/quotation',
        name: 'quotation',
        component: quotation
    },
    {
      path: '/Styles',
      name: 'Styles',
      component: Styles
    },{
      path: '/allCarStyle',
      name: 'allCarStyle',
      component: allCarStyle
    }
  ]
})
