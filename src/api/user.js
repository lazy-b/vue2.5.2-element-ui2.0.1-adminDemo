/*
* @Author: yang
* @Date:   2017-10-20 15:15:25
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 11:19:36
*/

import axios from 'axios';

// 用户登录
export function login(username, password) {
  return axios({
    url: '../../user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 获取用户信息
export function getInfo(token) {
  return axios({
    url: '../../user/info',
    method: 'get',
    params: { token: token }
  });
}

// 修改用户信息
export function editInfo(data, params) {
  return axios({
    url: '../../user/info/update.do',
    method: 'post',
    data: data,
    params: params
  })
}

export function logout() {
  return axios({
    url: '../../user/logout',
    method: 'post'
  })
}

// 用户注册
export function registe(data) {
  return axios({
    url: '../../user/registe',
    method: 'post',
    data: data
  })
}

