/*
* @Author: yang
* @Date:   2017-10-23 10:52:36
* @Last Modified by:   yang
* @Last Modified time: 2017-11-06 14:59:45
*/

import router from './index'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken ,removeToken} from '@/common/js/token' // 验权
import { Message } from 'element-ui'
// 白名单，可以直接在网址栏进入，不需要登录就可以进入的地址
// 根据下面实现的逻辑，白名单地址必须在初次加载路由时加载
// 而且login页面必须包括在白名单内，否则判断进入死循环
// 路径跳转统一使用name而不是直接写路径，方便后续修改路径
const whiteList = ['login'];

// 进行判断之后进行页面跳转
function jumpTo(to, next) {

  // 获取用户信息以及异步路由成功后进行跳转
  // 如果目标路径为登录页面则重定向到首页
  if (to.name === 'login') {
    // { ...to }扩展运算符，表示to的浅复制
    next({ name: 'welcome' });
  } else {
    next();
  }
}

router.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start();

  // 如果已经拥有了token，则判断是否已经获取异步路由
  // 如果没有获取过异步路由，则获取异步路由
  // 然后加载异步路由表
  // 最后根据完整路由表（过去加载或者刚刚加载）进行跳转（页面级权限）
  if (getToken() && getToken() !== 'undefined') {

    // 如果用户角色不存在，说明还没有获取过用户信息，同时没有加载异步路由表
    // 所以先获取用户信息
    // 然后根据角色信息获取路由表
    if (!store.getters.roles || store.getters.roles.length === 0) {

      // 获取用户信息
      store.dispatch('GetInfo').then(res => {
        const roles = res.data.user.roles;

        // 获取用户信息成功后获取路由表
        store.dispatch('GenerateRoutes', { roles }).then(() => {
          // 异步加载路由到根实例
          router.addRoutes(store.getters.asynchronousRoutes);

          // console.log(store.getters.asynchronousRoutes)
          // 获取用户信息以及异步路由成功后进行跳转
          // 如果目标路径为登录页面则重定向到首页
          if (to.name === 'login') {
            next({ name: 'welcome' });
          } else {
            // 此处不使用next()
            // 因为在next传入之前，异步路由还没有加载
            // 应该给next指定路径，这会导致一次页面重定向行为
            // 而页面重定向会导致router刷新，此时目标路径已经成功加载
            // { ...to }扩展运算符，表示to的浅复制
            next({ ...to });
            // next(to.path);
          }
        }, err => {
          // 获取异步路由失败后跳转到404页面并关闭进度条
          next({name: '404'});
          // console.log(err);
        });

      }, err => {
        // 获取用户信息失败后前端登出（删除token）
        // 跳转到登录页面，或者取消本次跳转（本来就在登录页面发起的获取信息请求）
        Message({
          type: 'error',
          message: '获取用户信息失败，请重新登录...'
        });

        // 前端登出并跳转到登录页面
        store.dispatch('FedLogOut').then(() => {

          // 如果是在登录阶段获取用户信息失败则取消此次跳转
          // 如果是token过期导致获取信息失败则跳转到login页面
          if (from.name === 'login') {
            next(false);
            // next(false)不会触发router.afterEach钩子，手动关闭进度条
            NProgress.done();
          } else {
            next({ name: 'login' });
          }
        })
      });

    // 否则直接跳转
    } else {

      // 获取用户信息以及异步路由成功后进行跳转
      // 如果目标路径为登录页面则重定向到首页
      if (to.name === 'login') {
        next({ name: 'welcome' });
      } else {
        next();
      }
    }

  // 如果没有获取到token，直接跳转到登录页面
  } else {

    // 如果跳往白名单地址，则直接放行
    if (whiteList.indexOf(to.name) !== -1) {
      next();

    // 否则进行跳转到登录页面
    } else {
      next({ name: 'login' });
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
}, err => {
  // console.log(err)
  NProgress.done(); // 结束Progress
});

