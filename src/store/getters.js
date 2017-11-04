/*
* @Author: yang
* @Date:   2017-10-23 11:06:08
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 10:38:17
*/

/**
 * 递归判断route的meta中是否存在，
 * 如果存在则将结果保存
 * @param  {obj} routes 路由对象
 * @return {arr}        路由对象集合
 */
import { getToken } from '@/common/js/token'

const getters = {
  /* 用户 */
  // 用户令牌
  token: state => state.user.token || getToken(),
  // 用户头像
  avatar: state => state.user.avatar,
  // 用户姓名
  userName: state => state.user.userName,
  // 用户角色
  roles: state => state.user.roles,

  /* 路由 */
  // 该用户能够进入的所有页面
  permissionRoutes: state => state.permissionRouter.routes,
  // 需要添加到菜单上的路由
  menuRoutes: state => {
    /**
     * 递归过滤路由，获得满足要求的路由结构
     * @param  {obj} routes 需要被过滤的路由
     * @return {arr}        符合条件的路由集合
     */
    const routeFilter = function routeFilter(routes) {
      let len = routes.length,
          route = {},
          result = [];

      for (let i = 0; i < len; i++) {
        route = { ...routes[i] };

        // route.meta.isMenu为真，则符合条件加入结果中
        // 同时route拥有子路由集合，则递归调用函数
        if (route.children && route.meta && route.meta.isMenu) {
          route.children = routeFilter(route.children);
          result.push(route);

        // route.meta.isMenu为真，则符合条件加入结果中
        // 且没有子路由
        } else if (route.meta && route.meta.isMenu) {
          result.push(route);

        // route拥有子路由集合，则递归调用函数
        // 且自身不符合条件
        // 由于父路由不符合条件，子路由进行提升
        } else if (route.children) {
          result.push(...routeFilter(route.children));
        }
      }
      return result;
    }

    return routeFilter(state.permissionRouter.routes);
  },
  // 该用户权限动态加载的页面
  asynchronousRoutes: state => state.permissionRouter.asynchronousRoutes,

  /* 侧边栏收缩 */
  // 侧边栏是否收起标识
  isCollapse: state => state.aside.isCollapse,

  /* tabs */
  // 所有的tab
  viewTabs: state => state.tabs.viewTabs

}

export default getters
