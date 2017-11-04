/*
* @Author: yang
* @Date:   2017-10-30 21:09:51
* @Last Modified by:   lazy1993
* @Last Modified time: 2017-11-03 21:15:09
*/

import * as types from '../mutation-types'

const state = {
  viewTabs: [] // 被添加的tabs
};

const mutations = {
  // 增加一个tab
  [types.PUSH_TAB] (state, tab) {
    state.viewTabs.push(tab);
  },
  // 删除一个tab
  [types.DELETE_TAB] (state, tab) {
    const index = state.viewTabs.indexOf(tab);

    state.viewTabs.splice(index, 1);
  }
};

const actions = {
  // 新增一个tab
  addTab({ commit }, route) {
    const tab = {
      name: route.name,
      path: route.path,
      label: route.meta.menuName
    };

    // 是否已经存在该route对应的tab
    const hasTab = state.viewTabs.some(function(item) {
      return item.name === route.name;
    });

    // 如果该tab没有在viewTabs中，则添加进来
    if (!hasTab) {
      commit(types.PUSH_TAB, tab);
    }
  },
  // 删除一个tab
  deleteTab({ commit }, tab) {
    commit(types.DELETE_TAB, tab);
  }
};

export default {
  state,
  actions,
  mutations
}
