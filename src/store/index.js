/*
* @Author: yang
* @Date:   2017-10-12 15:01:44
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 10:35:45
*/

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import permissionRouter from './modules/permissionRouter'
import aside from './modules/aside'
import tabs from './modules/tabs'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  state: { // 暂时没有属性

  },
  getters,
  modules: {
    user,
    permissionRouter,
    aside,
    tabs
  },
  strict: debug
});

export default store
