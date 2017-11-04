/*
* @Author: yang
* @Date:   2017-10-23 10:39:13
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 10:43:19
*/

import * as components from './components'

// 路由分成两部分加载
// 首先加载公共部分页面（login、404）
// 然后待后台返回roles之后再加载asynchronousRoutes部分
export const constantRoutes = [
  { path: '/login',
    name: 'login',
    component: components.Login
  },
  { path: '/NotFound',
    // 别名
    alias: '/404',
    name: '404',
    component: components.NotFound
  }
]

// 路由元信息meta中添加了几个自定义字段
// 这些信息用于确定权限以及生成侧边栏需要的信息
// role：一个用户角色信息的数组
// menuName：侧边栏显示的文本名
// icon：侧边栏显示的图标
// isMenu: 是否是菜单，如果是则添加到侧边栏菜单中，反之不添加
export let asynchronousRoutes = [
  { path: '/',
    name: 'home',
    component: components.Home,
    redirect: '/welcome', // 默认首页
    children: [
            {
              path: '/welcome',
              name: 'welcome',
              component: components.Welcome,
              meta: {
                role: [],
                isMenu: true,
                icon: 'el-icon-bell',
                menuName: '欢迎'
              }
            },
            {
              path: '/table',
              name: 'table',
              component: components.Table,
              meta: {
                role: ['tableEditer'],
                isMenu: true,
                icon: 'el-icon-document',
                menuName: '表格管理'
              },
              children: [
                {
                  path: '/table/orderInfo',
                  name: 'orderInfo', // route的name设置为表格名，方便获取数据
                  component: components.Table,
                  meta: {
                    role: ['tableEditer'],
                    isMenu: true,
                    icon: 'el-icon-document',
                    menuName: '订单信息管理'
                  }
                },
                {
                  path: '/table/orderSchedule',
                  name: 'orderSchedule',
                  component: components.Table,
                  meta: {
                    role: ['tableEditer'],
                    isMenu: true,
                    icon: 'el-icon-document',
                    menuName: '生产进度管理',
                  }
                }
              ]
            },
            {
              path: '/excelUpload',
              name: 'excelUpload',
              component: components.ExcelUpload,
              meta: {
                role: ['excelEditer'],
                isMenu: true,
                icon: 'el-icon-upload',
                menuName: 'EXCEL文件上传'
              }
            },
            {
              path: '/userInfo',
              name: 'userInfo',
              component: components.UserInfo,
              meta: {
                role: [],
                isMenu: true,
                icon: 'el-icon-info',
                menuName: '个人信息管理'
              }
            },
            {
              path: '/testView',
              name: 'testView',
              component: components.TestView,
              meta: {
                role: ['visitor'],
                isMenu: true,
                icon: 'el-icon-document',
                menuName: '测试页面'
              }
            }
        ]
  },
  { // 放在最后，否则全部被拦截到'/'
  path: '*',
  redirect: '/'
  }
]
