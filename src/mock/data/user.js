/*
* @Author: yang
* @Date:   2017-10-23 09:53:02
* @Last Modified by:   lazy1993
* @Last Modified time: 2017-11-03 16:21:21
*/

// 用户信息
import Mock from 'mockjs';

// 三个用户名对应三种不同的权限
// 图片尺寸中间的分隔符是字母x，不分大小写，不是*号，坑！！！
// "头"这个汉字mock出来的是乱码，用Unicode也不行，用avatar代替，坑！！！
const user = {
  admin: {  // 超级管理员，拥有所有页面权限
    roles: ['admin'],
    name: 'admin',
    avatar: Mock.Random.image('200X200', '#409EFF', '#fff', 'png', 'avatar')
  },
  tableEditer: { // 表格编辑，查看表格编辑页面
    roles: ['tableEditer'],
    name: 'table',
    avatar: Mock.Random.image('200X200', '#409EFF', '#fff', 'png', 'avatar')
  },
  excelEditer: { // excel上传编辑，上传excel
    roles: ['excelEditer'],
    name: 'excel',
    avatar: Mock.Random.image('200X200', '#409EFF', '#fff', 'png', 'avatar')
  },
  visitor: { // 游客，未注册用户
    roles: ['visitor'],
    name: 'visitor',
    avatar: Mock.Random.image('200X200', '#409EFF', '#fff', 'png', 'avatar')
  }
};

// 由于是模拟数据，没有token-roles对应表
// 故根据角色设置不同的token，实现根据token模拟返回不同的权限
const token = {
  admin: 'admin-' + Mock.Random.id(),
  table: 'table-' + Mock.Random.id(),
  excel: 'excel-' + Mock.Random.id(),
  visitor: 'visitor-' + Mock.Random.id()
};

export { user, token };
