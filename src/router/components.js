/*
* @Author: yang
* @Date:   2017-10-23 15:52:56
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 10:46:13
*/

// 使用模板字符串不能识别alias
// const components = '@/components'
// const views = '@/components/main/views'

/* 静态页面（直接加载） */
export const Login = () => import('@/components/Login');
export const NotFound = () => import('@/components/NotFound');

/* 动态页面（根据roles加载） */
// layout页面
export const Home = () => import('@/components/Home');
// 所有用户登录后默认的主视图
export const Welcome = () => import('@/components/main/views/Welcome');

// 数据表格视图页面，多个表格共用
export const Table = () => import('@/components/main/views/Table');
// excel文件上传页面
export const ExcelUpload = () => import('@/components/main/views/ExcelUpload');
// 用户信息页面
export const UserInfo = () => import('@/components/main/views/UserInfo');

// 测试页面
export const TestView = () => import('@/components/main/views/TestView');
