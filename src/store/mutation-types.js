/*
* @Author: yang
* @Date:   2017-10-20 14:02:48
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 10:39:36
*/

// 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。
// 这样可以使 linter 之类的工具发挥作用，
// 同时把这些常量放在单独的文件中
// 可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

/* user.js */
export const SET_TOKEN = 'SET_TOKEN'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_AVATAR = 'SET_AVATAR'
export const SET_ROLES = 'SET_ROLES'

/* permissionRouter.js */
export const SET_ROUTERS = 'SET_ROUTERS'

/* aside.js */
export const SET_ISCOLLAPSE = 'SET_ISCOLLAPSE'

/* tabs.js */
export const PUSH_TAB = 'PUSH_TAB'
export const DELETE_TAB = 'DELETE_TAB'
