/*
* @Author: yang
* @Date:   2017-10-20 15:10:19
* @Last Modified by:   yang
* @Last Modified time: 2017-11-06 14:59:28
*/

import Cookies from 'js-cookie'
// 设置cookie键名方便测试
const TokenKey = 'TOKEN'

// 获取cookie中的token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置cookie中的token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除cookie中的token
export function removeToken() {
  return Cookies.remove(TokenKey)
}

