// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store'
// 路由跳转之前进行判断
import '@/router/permission'
// 引入一些自定义全局样式
import '@/common/css/app.css'
// 给axios请求添加一些统一的操作
import '@/common/js/fetch'

// 使用ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

// 使用axios-mock-adapter
import AxiosMockAdapter from './mock/axiosMockAdapter'
AxiosMockAdapter.start();

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router, // 路由管理
  store, // 状态管理
  template: '<App/>',
  components: { App }
})



