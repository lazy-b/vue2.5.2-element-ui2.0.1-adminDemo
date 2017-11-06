/*
* @Author: yang
* @Date:   2017-10-12 19:35:35
* @Last Modified by:   yang
* @Last Modified time: 2017-11-06 10:58:53
*/

//导入模块
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// 导入虚拟数据
import { Orders, orderSchedules } from './data/table'
import { user, token } from './data/user'

// 设置模拟调试器实例
var mock = new MockAdapter(axios, {delayResponse: 0});

export default {
  start() {
    /**
     * 表格请求部分模拟
     */
    // 订单信息表
    // 模拟../../orderInfo/list.do的GET请求
    //reply的参数为 (status, data, headers)
    mock.onGet('../../orderInfo/list.do').reply(200, {
      tableInfo: Orders
    });
    // 模拟../../orderInfo/deleteBatch.do的post删除请求
    mock.onPost('../../orderInfo/deleteBatch.do').reply(function(config) {
      // console.log('request', config);
      return [200, {
        msg: config.data
      }];
    });
    // 模拟../../orderInfo/update.do的post修改请求
    mock.onPost('../../orderInfo/update.do').reply(function(config) {
      return [200, {
        msg: config.data
      }];
    });
    // 模拟../../orderInfo/insert.do的post插入请求
    mock.onPost('../../orderInfo/insert.do').reply(function(config) {
      // console.log('request', config);
      return [200, {
        msg: config.data
      }];
    });

    // 生产进度表
    // 模拟../../orderSchedule/list.do的GET请求
    //reply的参数为 (status, data, headers)
    mock.onGet('../../orderSchedule/list.do').reply(200, {
      tableInfo: orderSchedules
    });
    // 模拟../../orderSchedule/deleteBatch.do的post删除请求
    mock.onPost('../../orderSchedule/deleteBatch.do').reply(function(config) {
      // console.log('request', config);
      return [200, {
        msg: config.data
      }];
    });
    // 模拟../../orderSchedule/update.do的post修改请求
    mock.onPost('../../orderSchedule/update.do').reply(function(config) {
      return [200, {
        msg: config.data
      }];
    });
    // 模拟../../orderSchedule/insert.do的post插入请求
    mock.onPost('../../orderSchedule/insert.do').reply(function(config) {
      // console.log('request', config);
      return [200, {
        msg: config.data
      }];
    });

    /**
     * 文件上传部分
     */
    mock.onPost('../../test/upload.do').reply(function(config) {
      // console.log('request', config);
      return [200, {
        uploadfileType: config.data.get('uploadfileType'),
        uploadfile: config.data.get('uploadfile'),
        msg: '上传成功'
      }];
    });

    /**
     * 登录、注册部分模拟
     */
    // 测试登录请求
    mock.onPost('../../user/login').reply(function(config) {
      let status = 404,
          msg = '',
          data = config.data;

      data = JSON.parse(data);
      if (data.username === 'admin' ||
          data.username === 'table' ||
          data.username === 'excel' ||
          data.username === 'visitor') {
        status = 200;
        msg = '验证通过、、、';
      } else {
        status = 401;
        msg = '用户名或者密码错误、、';
      }

      return [status, {
        msg: msg,
        token: token[data.username],
        homeViewName: ''  // 个性化主页，route的name，方便后续修改路径
      }];
    });
    // 测试修改用户信息
    mock.onPost('../../user/logout').reply(200, {
      msg: '退出成功!'
    });
    // 测试注册请求
    mock.onPost('../../user/registe').reply(function(config) {
      let status = 200,
          msg = '',
          data = JSON.parse(config.data);

      msg = '用户名：' + data.username + ',密码' + data.password;
      return [status, {
        msg: msg
      }];
    });
    // 测试获取用户信息
    mock.onGet('../../user/info').reply(function(config) {
      let replyUser = {};
      // 前面设置toke格式为：用户名-id
      // 所以通过分隔“-”得到第一项为用户名
      // 实际生产时，应该把token和对应userInfo存在数据库中
      const name = config.params.token.split('-')[0];
      // 返回对应用户名的用户
      for (let item in user) {

        if (name === user[item].name) {
          replyUser = user[item];
        }
      }

      // 如果有对应信息则返回200状态码，否则返回401未授权
      if (replyUser.name) {
        return [200, {
          user: replyUser
        }];
      } else {
        return [401, {
          user: {},
          msg: '获取个人信息失败！'
        }];
      }
    });
    // 测试修改用户信息
    mock.onPost('../../user/info/update.do').reply(200, {
      msg: '修改个人信息成功'
    });


    /* 剩余请求拦截 */
    mock.onGet().reply(200, {
      msg: 'onGet、、、'
    });
    mock.onPost().reply(200, {
      msg: 'onpost、、、'
    });
  }
}
