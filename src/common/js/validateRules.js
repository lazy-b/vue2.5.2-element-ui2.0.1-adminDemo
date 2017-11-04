/*
* @Author: yang
* @Date:   2017-10-17 21:54:01
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 11:16:03
*/

// 占个位，并没有实现
export const rules ={
  name: [
  ],
  region: [
    { required: true, message: '请选择活动区域', trigger: 'change' }
  ],
  date1: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  ],
  date2: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  ],
  type: [
    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
  ],
  resource: [
    { required: true, message: '请选择活动资源', trigger: 'change' }
  ],
  desc: [
    { required: true, message: '请填写活动形式', trigger: 'blur' }
  ]
};
