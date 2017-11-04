/*
* @Author: yang
* @Date:   2017-10-16 20:17:50
* @Last Modified by:   yang
* @Last Modified time: 2017-10-31 13:57:44
*/
// 订单信息表
export const orderInfo= [
  {autoComplete: true, sortable: true, field: "orderNo", title: "订单号", width: 100, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: true, sortable: true, field: "productName", title: "产品名称", width: 120, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "orderAmount", title: "订单数量", width: 100, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "stockAmount", title: "库存", width: 60, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "spareParts", title: "备品", width: 60, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "planAmount", title: "需生产数", width: 100, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "orderDate", title: "下单日期", width: 100, componentTag: 'el-date-picker', rule: 'name', placeholder: '请输入', type: 'date'},
  {autoComplete: false, sortable: true, field: "requiredDate", title: "要求交货日期", width: 100, componentTag: 'el-date-picker', rule: 'name', placeholder: '请输入', type: 'date'},
  {autoComplete: false, sortable: true, field: "replyDate", title: "交期", width: 100, componentTag: 'el-date-picker', rule: 'name', placeholder: '请输入', type: 'date'},
  {autoComplete: false, sortable: true, field: "purchaseRequirement", title: "特别要求", width: 180, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: 'textarea'},
  {autoComplete: true, sortable: true, field: "materialCoding", title: "物料长代码", width: 100, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: true, sortable: true, field: "materialModel", title: "规格型号", width: 100, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: true, sortable: true, field: "orderStatus", title: "生产状态", width: 100, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: true, sortable: true, field: "remark", title: "备注", width: 140, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: 'textarea'},
  {autoComplete: true, sortable: true, field: "exceptionReason", title: "异常原因", width: 100, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: true, sortable: true, field: "orderType", title: "订单类型", width: 100, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "price", title: "单价", width: 80, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''}
];

// 订单进度表
export const orderSchedule= [
  {autoComplete: true, sortable: true, field: "orderNo", title: "订单号", width: 100, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: true, sortable: true, field: "productName", title: "产品名称", width: 120, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "batch", title: "批次", width: 60, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "reciverOrder", title: "下单日期", width: 100, componentTag: 'el-date-picker', rule: 'name', placeholder: '请输入', type: 'date'},
  {autoComplete: false, sortable: true, field: "planProductTime", title: "计划生产开始时间", width: 100, componentTag: 'el-date-picker', rule: 'name', placeholder: '请输入', type: 'date'},
  {autoComplete: false, sortable: true, field: "productStatus", title: "生产开始状态", width: 60, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "planProductFinish", title: "计划生产完成时间", width: 100, componentTag: 'el-date-picker', rule: 'name', placeholder: '请输入', type: 'date'},
  {autoComplete: false, sortable: true, field: "productFinishStatus", title: "生产完成状态", width: 60, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''},
  {autoComplete: false, sortable: true, field: "planOrderFinish", title: "订单计划完成时间", width: 100, componentTag: 'el-date-picker', rule: 'name', placeholder: '请输入', type: 'date'},
  {autoComplete: false, sortable: true, field: "orderFinishStatus", title: "订单完成状态", width: 60, componentTag: 'el-input', rule: 'name', placeholder: '请输入', type: ''}
];
