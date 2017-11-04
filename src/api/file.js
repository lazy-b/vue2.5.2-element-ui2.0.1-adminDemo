/*
* @Author: yang
* @Date:   2017-11-01 20:59:26
* @Last Modified by:   lazy1993
* @Last Modified time: 2017-11-03 08:53:59
*/
import axios from 'axios';

// 文件上传
// data：被formData序列化的文件主体
// params：随文件发送的参数
export function uploadFile(data, params) {
  return axios({
    url: '../../test/upload.do',
    method: 'post',
    data: formData,
    params: params
  })
}
