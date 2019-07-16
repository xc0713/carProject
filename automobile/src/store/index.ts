import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// 引入子模块
import home from './modules/home';
import quotation from './modules/quotation';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        quotation
    },
    plugins: [createLogger()]
})

