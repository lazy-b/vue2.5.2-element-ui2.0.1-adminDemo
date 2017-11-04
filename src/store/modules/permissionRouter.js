/*
* @Author: yang
* @Date:   2017-10-23 11:08:47
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 10:41:03
*/
import * as types from '../mutation-types'
import {asynchronousRoutes, constantRoutes } from '@/router/routes'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role && route.meta.role.length > 0) {

    // 只要route.meta.role中存在任意roles中元素，则认为拥有权限，可以通过
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {

    // 如果没有设置route.meta.role，则认为是公共页面，直接通过
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asynchronousRoutes 服务端返回的路由信息，需要被再次过滤
 * @param roles 用户角色信息
 */
function filterAsyncRouter(asynchronousRoutes, roles) {

  // 过滤异步路由
  const accessedRouters = asynchronousRoutes.filter(route => {
    if (hasPermission(roles, route)) {

      // 如果存在子路由则继续进行过滤
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });

  return accessedRouters;
}

const permissionRouter = {
  state: {
    routes: constantRoutes,
    asynchronousRoutes: []
  },
  mutations: {
    // 设置最终的路由
    [types.SET_ROUTERS]: (state, routes) => {
      state.asynchronousRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    }
  },
  actions: {
    // 生成完整前端路由表
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // 解构赋值
        const { roles } = data;
        let accessedRouters = [];

        // 默认admin拥有所有页面的权限，如果不符合实际要求可以将if判断去掉
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asynchronousRoutes;
        } else {
          accessedRouters = filterAsyncRouter(asynchronousRoutes, roles);
        }
        commit(types.SET_ROUTERS, accessedRouters);
        resolve();
      })
    }
  }
}

export default permissionRouter;

