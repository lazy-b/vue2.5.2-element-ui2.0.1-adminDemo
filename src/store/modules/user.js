/*
* @Author: yang
* @Date:   2017-10-20 10:56:10
* @Last Modified by:   lazy1993
* @Last Modified time: 2017-11-03 17:39:00
*/

import * as types from '../mutation-types'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/common/js/token'
import router from '@/router'

const state = {
  token: '', // 用户令牌
  userName: '', // 用户名
  avatar: '', // 用户头像
  roles: [] // 用户角色集合
};

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token;
  },
  [types.SET_USERNAME] (state, name) {
    state.userName = name;
  },
  [types.SET_AVATAR] (state, avatar) {
    state.avatar = avatar;
  },
  [types.SET_ROLES] (state, roles) {
    state.roles = roles;
  }
};

const actions = {
  // 登录
  // commit: context.commit (使用参数解构)
  // loginForm: 登录表单(payload)
  Login({ commit }, loginForm) {
    const username = loginForm.username.trim(),
          password = loginForm.password;

    return new Promise((resolve, reject) => {
      login(username, password).then(response => {
        const data = response.data;

        // 将得到的token存入cookie
        setToken(data.token);

        // 提交'SET_TOKEN'，在state中存入token
        commit(types.SET_TOKEN, data.token);

        // promise状态改变为resolve
        resolve(response);
      }).catch(error => {
        // console.log('Login', error)
        reject(error);
      })
    })
  },

  // 获取用户信息
  // commit、state：结构赋值
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 如果state.token没有值，则取出cookie中的token并存入
      if (!state.token) {
        // 提交'SET_TOKEN'，在state中存入token
        commit(types.SET_TOKEN, getToken());
      }

      // 获取用户信息
      getInfo(state.token).then(response => {
        const data = response.data.user;
        // 将后台返回的信息存入state
        commit(types.SET_ROLES, data.roles);
        commit(types.SET_USERNAME, data.name);
        commit(types.SET_AVATAR, data.avatar);
        // console.log(data)
        resolve(response);
      }).catch(error => {
        // console.log(error)
        reject(error);
      })
    })
  },

  // 登出
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 将state中SET_TOKEN、SET_ROLES重置为空
      // 然后将cookie中的token删除
      logout(state.token).then(() => {
        commit(types.SET_TOKEN, '');
        commit(types.SET_ROLES, []);
        removeToken();

        // 登出后手动刷新页面
        // 使得vue实例重新加载
        // 实现router的重置
        // 否则会出现route重复加载的bug
        // window.location.reload(true);
        // 上面使用js原生方法刷新页面，本页面采用router的go实现
        router.go(0);
        resolve();
      }).catch(error => {
        reject(error);
      })
    })
  },

  // 前端登出
  // 用于处理登录token失效（以及有token但是不能获取对应用户信息）
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit(types.SET_TOKEN, '');
      removeToken();
      resolve();
    })
  }
};

export default {
  state,
  actions,
  mutations
}
