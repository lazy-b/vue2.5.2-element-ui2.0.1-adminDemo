/*
* @Author: yang
* @Date:   2017-10-12 17:37:16
* @Last Modified by:   yang
* @Last Modified time: 2017-11-06 11:17:13
*/

// 全局请求拦截器在main.js中配置
import axios from 'axios';

/* 数据增删改查模块
 * requestParams：调用dao的请求参数
 * requestParams = {
 *    method: '', // 请求操作类型
 *    params: {} // 请求附带参数
 * }
 */

// 请求路径-表名映射
const baseURL = {
  ORDERINFO: '../../orderInfo',
  ORDERSCHEDULE: '../../orderSchedule'
}
export const crud = function(requestParams) {

  var tableName = requestParams.name.toUpperCase(),
      base = baseURL[tableName], // 根据请求的表名取出对应请求路径
      myPromise = null; // 返回的Promise 对象

  switch(requestParams.method.toUpperCase()) {
    // 获取整个表格数据
    case 'GET':
      myPromise = axios.get(`${base}/list.do`);
      break;
    // 新增数据
    case 'ADD':
      myPromise = axios.post(`${base}/insert.do`, { data: requestParams.data });
      break;
    // 删除数据
    // params: {ids: ids}
    // ids为用逗号分隔开每个id的字符串
    case 'DELETE':
      myPromise = axios.post(`${base}/deleteBatch.do`, { data: requestParams.data });
      break;
    // 修改数据
    case 'EDIT':
      myPromise = axios.post(`${base}/update.do`, { data: requestParams.data });
      break;
    // 查找数据，目前使用离线搜索，故不需要这个功能
    // case 'QUERY':
    //   myPromise = axios.post(`${base}/list.do`, { params: requestParams.params });
    //   break;
    // 都不匹配则同样返回rejected状态
    default:
      // 使用error进行堆栈跟踪
      // myPromise = Promise.reject(new Error("请求参数有误")).then(null,
      //               function(error) {console.log(error);});
      myPromise = Promise.reject(new Error("请求参数有误"));
  }

  return myPromise;
}

