/*
* @Author: yang
* @Date:   2017-10-12 16:56:51
* @Last Modified by:   yang
* @Last Modified time: 2017-11-04 11:17:17
*/

// 占个位，并没有用到
export default {
  // 数组去重
  unique: function unique(arr) {
      var result = [],
          obj = {},
          len = arr.length,
          i, key;

      for (i = 0; i < len; i++) {
        key = arr[i];

        // 如果key第一次出现，则存入result
        if (!obj[key]) {
            result.push(key);
            obj[key] = true;
        }
      }

      return result;
  },
  getDateObj: function getDateObj(string) {
    var reg = /(\d+)[^\d]+(\d+)[^\d]+(\d+)/,
        result = [];

    result = reg.exec(string);
    // 匹配成功且正确（至少匹配了年）则返回对应的日期对象
    if (result && result.length >= 2 ) {
      // 如果匹配到了月份，则将该数字减一得到Date需要的月份
      if (result[2]) {
        result[2] -= 1;
      }

      // 第一个匹配项没有用，故用splice截去
      result.splice(0, 1);

      // 结构赋值
      return new Date(result);
    } else {
      throw new Error('无法转化该字符串为日期对象！!');
    }
  }
};

