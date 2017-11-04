/*
* @Author: yang
* @Date:   2017-10-12 19:36:36
* @Last Modified by:   lazy1993
* @Last Modified time: 2017-11-04 08:32:26
*/

// 订单信息
import Mock from 'mockjs';

// 扩展mock模板
// 生成部件名
Mock.Random.extend({
    parts: function(date) {
        var constellations = ['筒身', '筒尾', '筒头', '灯座'];
        return this.pick(constellations);
    },
    orderStatus: function(date) {
        var constellations = ['未处理', '已排', '已交氧化', '完成'];
        return this.pick(constellations);
    },
    productStatus: function(date) {
        var constellations = [0, 1];
        return this.pick(constellations);
    }
})

// 订单信息
let Orders = [];
for (let i = 0; i < 200; i++) {
  Orders.push(Mock.mock({
    id: Mock.Random.guid(),
    orderNo: 'PO' + Mock.Random.string('number', 8),
    productName: Mock.Random.string('upper', 2) + Mock.Random.parts() + 'S' +
                  Mock.Random.integer(1, 8),
    orderAmount: 100 * Mock.Random.integer(1, 30),
    stockAmount: Mock.Random.integer(1, 100),
    spareParts: Mock.Random.integer(1, 50),
    planAmount: 100 * Mock.Random.integer(1, 30),
    orderDate: Mock.Random.date(),
    requiredDate: Mock.Random.date(),
    replyDate: Mock.Random.date(),
    purchaseRequirement: Mock.Random.cparagraph(0, 20),
    materialCoding: Mock.Random.string('number', 3) + '.' +
                    Mock.Random.string('number', 3) + '.' +
                    Mock.Random.string('number', 3) + '.' +
                    Mock.Random.string('number', 3),
    materialModel: Mock.Random.cparagraph(4),
    orderStatus: Mock.Random.orderStatus(),
    remark: Mock.Random.cparagraph(0, 20),
    exceptionReason: Mock.Random.cparagraph(0, 20),
    orderType: '白件',
    price: Mock.Random.float(0, 10, 2, 2)
  }));
}

// 生产进度
let orderSchedules = [];
for (let j = 0; j < 200; j++) {
    orderSchedules.push(Mock.mock({
      id: Mock.Random.guid(),
      orderNo: 'PO' + Mock.Random.string('number', 8),
      productName: Mock.Random.string('upper', 2) + Mock.Random.parts() + 'S' +
                    Mock.Random.integer(1, 8),
      batch: Mock.Random.integer(0, 5),
      reciverOrder: Mock.Random.date(),
      planProductTime: Mock.Random.date(),
      productStatus: Mock.Random.productStatus(),
      planProductFinish: Mock.Random.date(),
      productFinishStatus: Mock.Random.productStatus(),
      planOrderFinish: Mock.Random.date(),
      orderFinishStatus: Mock.Random.productStatus()
    }));
}


export { Orders, orderSchedules };
