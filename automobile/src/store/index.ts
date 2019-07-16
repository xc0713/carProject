import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import home from './modules/home'
import style from './modules/style'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        home,
        style
    },
    plugins:[createLogger()]
})