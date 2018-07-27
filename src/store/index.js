import Vue from 'vue';
import Vuex from 'vuex';

import { Master } from './modules/Master';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Master }
});
