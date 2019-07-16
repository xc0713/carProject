import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// 引入子模块
import home from './modules/home';
import quotation from './modules/quotation';
import style from './modules/style'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        home,
        style,
        quotation
    },
    plugins:[createLogger()]
})
