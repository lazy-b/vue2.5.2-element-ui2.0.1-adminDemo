/*
* @Author: yang
* @Date:   2017-10-20 15:16:14
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 11:18:53
*/

import axios from 'axios'
import store from '@/store'
import { getToken } from './token'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 给每个请求添加token
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  // console.log(error);
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  // console.log('连接错误、', error);
  return Promise.reject(error);
});
