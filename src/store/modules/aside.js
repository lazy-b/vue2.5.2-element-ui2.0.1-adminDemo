/*
* @Author: yang
* @Date:   2017-10-30 16:52:52
* @Last Modified by:   yang
* @Last Modified time: 2017-10-30 21:19:56
*/

import * as types from '../mutation-types'

const state = {
  isCollapse: false // 菜单是否展开
};

const mutations = {
  [types.SET_ISCOLLAPSE] (state) {
    state.isCollapse = !state.isCollapse;
  }
};

const actions = {
  // 设置菜单展开状态
  // commit、state：结构赋值
  setIsCollapse({ commit }) {
    commit(types.SET_ISCOLLAPSE)
  }
};

export default {
  state,
  actions,
  mutations
}

