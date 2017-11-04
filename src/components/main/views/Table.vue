<template>
  <div class="table my-datagrid"  v-show="hasGetData">

    <!-- 表格操作按钮及搜索输入框 -->
    <el-row class="edit-button">
      <el-col :span="12">
        <div class="grid-content">
          <el-button
            size="medium"
            type="primary"
            @click="addHandler"
            icon="el-icon-plus"
            round>
            新增一行
          </el-button>
          <el-button
            size="medium"
            type="danger"
            @click="batchDeleteHandler"
            icon="el-icon-delete"
            round>
            批量删除
          </el-button>
          <el-button
            size="medium"
            @click="reloadHandler"
            type="warning"
            round>
            重新加载
          </el-button>
        </div>
      </el-col>
      <!-- 搜索复合输入框应用自动完成有bug，故利用popover手动实现自动完成 -->
      <el-col :span="12" :offset="0">
        <!-- inline-form为本组件样式 -->
        <el-form
          ref="searchForm"
          class="inline-form"
          inline>
          <el-form-item>
            <!-- auto-complete为全局样式 -->
            <el-popover
              placement="bottom"
              popper-class="auto-complete"
              trigger="focus">
              <ul @wheel.prevent="autoCompleteWheel">
                <li
                  v-for="(value, index) in autoCompleteValueArr"
                  :value="value"
                  @click.prevent="autoCompleteClick"
                  :key="index">
                  {{value}}
                </li>
              </ul>
              <!-- autoCompleteFocus传入的对象用于确定目标绑定的数据 -->
              <el-input
                slot="reference"
                spellcheck="false"
                @focus="autoCompleteFocus({
                  targetObj: 'searchForm',
                  targetKey: 'value',
                  sourceKey: searchForm.valueType
                })"
                v-model.trim="searchForm.value"
                placeholder="请输入内容">
                <el-select
                  v-model="searchForm.valueType"
                  class="my-select-type"
                  slot="prepend"
                  filterable
                  @change="changeKeyValue"
                  placeholder="请先选择搜索类型">
                  <el-option
                    v-for="valueType in searchForm.valueTypeArr"
                    :key="valueType.value"
                    :label="valueType.label"
                    :value="valueType.value">
                  </el-option>
                </el-select>
                    <el-button
                  slot="append"
                  @click.prevent="offlineSearch"
                  icon="el-icon-search">
                </el-button>
              </el-input>
            </el-popover>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 数据表格 -->
    <el-table
      :data="datagridData"
      border
      stripe
      @select="selected"
      @select-all="selected"
      empty-text=" "
      :height="tableHeight">
      <el-table-column
        type="index"
        width="19">
      </el-table-column>
      <el-table-column
        type="selection"
        width="19">
      </el-table-column>
      <el-table-column
        v-for="item in datagridConfig"
        :prop="item.field"
        :key="item.field"
        :label="item.title"
        :formatter="tableFormat"
        :sortable="item.sortable"
        show-overflow-tooltip
        :width="item.width">
      </el-table-column>
      <!-- 表id字段不渲染 -->

      <!-- 操作按钮 -->
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="editHandler(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteHandler(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 表单弹窗 -->
    <div class="dialogContain">
      <el-dialog
        :title="dialogTitle"
        center
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="dialogFormVisible">
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-width="140px">
          <el-form-item
            v-for="(item, index) in datagridConfig"
            :key="item.field"
            :label="item.title"
            :prop="item.rule">

            <!-- auto-complete为全局样式 -->
            <el-popover
              v-if="item.autoComplete"
              placement="bottom"
              popper-class="auto-complete"
              visible-arrow
              trigger="focus">
              <ul @wheel.prevent="autoCompleteWheel">
                <li
                  v-for="(value, index) in autoCompleteValueArr"
                  :value="value"
                  @click.prevent="autoCompleteClick"
                  :key="index">
                  {{value}}
                </li>
              </ul>
              <el-input
                :placeholder="item.placeholder"
                spellcheck="false"
                @focus="autoCompleteFocus({
                  targetObj: 'form',
                  targetKey: item.field,
                  sourceKey: item.field
                })"
                slot="reference"
                v-model="form[item.field]">
              </el-input>
            </el-popover>

            <component
              v-else
              :is="item.componentTag"
              spellcheck="false"
              :type="item.type"
              v-model="form[item.field]"
              :placeholder="item.placeholder">
            </component>
          </el-form-item>
          <!-- id字段不显示 -->
          <el-form-item v-show="false" label="表id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveRow">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { crud } from '@/api/table'
import { rules } from '@/common/js/validateRules'
import * as tableViewConfig from '@/common/js/tableView.config'

export default {
  data () {
      return {
        datagridConfig: [], // 表格配置项
        hasGetData: false, // 是否成功获取的数据，成功获取到数据后置为true
        dialogFormVisible: false, // 是否展示表单
        sourceData: [], // 请求得到的原始表格数据
        // 搜索框需要的数据
        searchForm: {
          isSearch: false, // 是否执行搜索
          valueType: 'orderNo',
          valueTypeArr: [  // 搜索类型的列表，对象数组
            {value: 'orderNo', label: '订单号'},
            {value: 'productName', label: '产品名称'},
          ],
          value: '', // 输入框的值
          searchValue: '' // 实际执行搜索的值
        },
        selection: [], // 表格被选中数据（行）
        editRow: {}, // 被修改的行
        // 发送ajax请求的参数
        requestParams: {
          method: 'GET',
          name: 'orderInfo', // 表格名，在页面的create阶段初始化，然后不再设置
          params: { // 即将与请求一起发送的 URL 参数
            ids: ''
          },
          data: { // 请求主体被发送的数据

          }
        },
        dialogTitle: '新增信息', // 弹窗标题
        // 表单
        form: {
          id: '' // id字段在表单中不显示，且config中没有，故手动添加占位
        },
        // 表单验证规则
        rules: {
        },
        // 自动完成数据，每一项类似：{orderNo: ['PO20170011']}
        autoComplete: {
          orderNo: [],
          productName: []
        },
        autoCompleteConfig: {
          sliceBegin: 0, // 数据截取开始的index
          showLen: 5, // 截取的长度，也就是一次展示的数据个数
          resultLen: -1 // 自动完成过滤后结果的个数，-1为未过滤
        },
        autoCompleteTarget: {
          targetObj: '', // 目标输入框数据绑定的对象名
          targetKey: '', // 目标输入框数据绑定的属性名
          sourceKey: '' // 目标输入框数据绑定的属性名对应备选数据的属性名
        },
        // 需要格式化显示的字段
        format: {
          date: []
        }
      }
  },
  computed: {
    // 经过处理得到的表格数据
    datagridData() {
      var searchForm = this.searchForm,
          filterData = this.sourceData,
          filterKey = searchForm.valueType,
          filterValue = searchForm.searchValue;

      if (searchForm.isSearch && filterValue !== '') {
        // 如果数组元素的filterKey属性值与filterValue相同，则存入该元素
        filterData = filterData.filter(item => item[filterKey] == filterValue);

        // 过滤之后将isSearch重置为空
        this.searchForm.searchValue = '';
        this.searchForm.isSearch = false;
      }
      return filterData;
    },
    // 根据目标输入框实时过滤备选列表
    // 返回经过过滤的列表数据
    autoCompleteValueArr: function() {
      var data = this.autoComplete,
          config = this.autoCompleteConfig,
          target = this.autoCompleteTarget,
          begin = config.sliceBegin,
          end = begin + config.showLen,
          tagValue, result;

      // 如果config已经被初始化了才开始过滤
      if (target.targetObj && target.targetKey && target.sourceKey) {
        tagValue = this[target.targetObj][target.targetKey];
        result = data[target.sourceKey];
      } else {
        tagValue = '';
        result = data.orderNo;  // 给一个默认值
      }

      // value长度大于零进行过滤操作
      // 如果数组值中包含该字符，则可以返回结果中
      result = tagValue.length !== 0 ?
        result.filter(v => (v + '').toLowerCase().indexOf(('' + tagValue).toLowerCase()) != -1) :
        result;

      // 由于弹框高度有限，故对结果进行截取
      // 截取之前先返回结果数据的长度，方便进行滚动事件处理时的判断
      this.autoCompleteConfig.resultLen = result.length;
      return result.slice(begin, end);
    },
    // 表格高度动态计算
    tableHeight() {
      return document.body.clientHeight || document.documentElement.clientHeight - 240;
    }
  },
  methods: {
    // 获得数据列表
    // 然后执行setAutoList函数
    getData() {
      // 首先设置请求参数
      this.requestParams.method = 'get';

      crud(this.requestParams).then((res) => {
        // 后台数据正确返回后才对this.sourceData赋值

        if (res && res.data && res.data.tableInfo) {
          // var newArr = [0, this.sourceData.length].concat(res.data.tableInfo);
          // this.sourceData.splice.apply(this.sourceData, newArr);
          this.sourceData = res.data.tableInfo;
          this.hasGetData = true;

          // 在获取数据之后再设置自动完成需要的备选列表数据
          this.setAutoList();
        } else {
          console.log("后台返回数据有误！");
        }
      }, (error) => {

        this.$alert('获取表格数据失败，请稍后重试或者联系管理员。', '错误', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      });
    },

    // 下面是页内数据搜索部分功能函数（包含自动完成功能）

    // 搜索类型的value改变时，更新搜索的valueType
    // 清空目标输入框
    // 同时设置自动完成的sourceKey
    changeKeyValue(value) {
      // 更新搜索的valueType
      // 搜索的类型为选中的选项的value
      this.searchForm.valueType = value;
      this.searchForm.value = '';
      this.searchForm.searchValue = '';

      // 同时设置自动完成的sourceKey
      this.autoCompleteTarget.sourceKey = value;
    },
    // 点击搜索按钮，执行页内离线搜索
    // 实际为设置isSearch标识位以及searchValue的值触发搜索
    offlineSearch(e) {
      this.searchForm.searchValue = this.searchForm.value;
      this.searchForm.isSearch = true;
    },

    // 下面是自动完成输入框需要的函数

    // 设置自动完成需要的备选列表数据
    setAutoList() {
      var sourceData = this.sourceData,
          config = this.datagridConfig,
          obj = {};

      for (let i = 0, len = sourceData.length; i < len; i++) {
        for (let item in this.autoComplete) {
          // debugger;
          // 将未重复的结果存入this.autoComplete中
          if(!obj[item]) {
            obj[item] = {};
          }
          if(!obj[item][sourceData[i][item]]) {
            obj[item][sourceData[i][item]] = true;
            this.autoComplete[item].push(sourceData[i][item]);
          }
        }
      }
    },
    // 绑定自动完成输入框的focus处理函数
    // 将目标输入框的列表名和字段名保存在autoCompleteTarget
    autoCompleteFocus(obj) {
      this.autoCompleteTarget.targetObj = obj.targetObj;
      this.autoCompleteTarget.targetKey = obj.targetKey;
      // 默认使用targetKey作为sourceKey
      this.autoCompleteTarget.sourceKey = obj.sourceKey ?
                                          obj.sourceKey : obj.targetKey;
    },
    // 自动完成下拉列表鼠标滚动处理函数
    // 更新列表数据截取的开始和结束位置
    // 此处不做函数节流更符合使用场景
    autoCompleteWheel(e) {
      // 向下滚动滚轮：e.deltaY为100
      // 向上滚动滚轮：e.deltaY为-100
      var config = this.autoCompleteConfig,
          begin = config.sliceBegin,
          end = begin + config.showLen,
          len = config.resultLen;

      if (e.deltaY > 0 && end < len) {
        this.autoCompleteConfig.sliceBegin++;
      } else if(e.deltaY < 0 && begin > 0) {
        this.autoCompleteConfig.sliceBegin--;
      }
    },
    // 自动完成下拉列表鼠标单击处理函数
    // 将被点击列表的值填入根据autoCompleteTarget确定的输入框中
    // 同时将列表数据截取的开始位置重置
    autoCompleteClick(e) {
      var value = e.srcElement.innerText,
          targetObj = this.autoCompleteTarget.targetObj,
          targetKey = this.autoCompleteTarget.targetKey;

      this[targetObj][targetKey] = value;
      this.autoCompleteConfig.sliceBegin = 0;
    },


    // 表格行被选择时的处理函数
    // 将结果存入selection
    selected(selection) {
      this.selection = selection;
    },

    // 下面是按钮处理程序
    // 新增行按钮
    // 1、打开弹窗
    // 2、设置ajax请求路径（即设置请求method）
    addHandler() {
      // 打开弹窗
      this.dialogFormVisible = true;

      // 设置axios的ajax请求parms的method为ADD
      this.requestParams.method = 'add';
    },
    // 单个删除按钮
    deleteHandler(index, row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 先设置请求参数
        this.requestParams.method = 'delete';
        this.requestParams.data = {
          ids: row.id
        }

        // 向后台发起删除请求
        crud(this.requestParams).then(res => {
          // console.log('response', res);
          // 后台返回成功
          if (res.status >= 200 && res.status <= 300) {
            let msg = res.data.msg,
                index = 0;

            // 在页面上进行删除操作
            index = this.sourceData.indexOf(row);
            this.sourceData.splice(index, 1);

            // 再次设置自动完成的备选列表
            this.setAutoList();
            // console.log(index);
            this.$message({
              type: 'success',
              message: '第- ' + index + ' -条数据删除成功！'
            });
          }
        }, error => {
          this.$message({
            type: 'info',
            message: '删除失败！'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      // console.log( index, row);
    },
    // 批量删除按钮
    batchDeleteHandler() {
      var selections = this.selection,
          len = selections.length,
          selectIds = [],
          ids = '';

      for (let i = 0; i < len; i++) {
        selectIds.push(selections[i].id);
      }

      // 根据后台要求对参数进行处理
      ids = selectIds.join(',');
      this.$confirm('您选中了- ' + len + ' -条数据！此操作将永久删除这些数据, 是否继续?',
                      '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 先设置请求参数
        this.requestParams.method = 'delete';
        this.requestParams.data = {
          ids: ids
        }

        // 向后台发起删除请求
        crud(this.requestParams).then(res => {
          // console.log('response', res);
          // 后台返回成功
          if (res.status >= 200 && res.status <= 300) {
            let msg = res.data.msg,
                index = 0;

            // 在页面上进行删除操作
            for (let i = 0; i < len; i++) {
              index = this.sourceData.indexOf(selections[i]);
              this.sourceData.splice(index, 1);
            }

            // 再次设置自动完成的备选列表
            this.setAutoList();
            // console.log(index);
            this.$message({
              type: 'success',
              message: '共- ' + len + ' -条数据删除成功！'
            });
          }
        }, error => {
          this.$message({
            type: 'info',
            message: '删除失败！'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 修改按钮
    // 首先对弹窗填充对应行的值
    // 打开弹窗
    // 设置ajax请求路径（即设置请求method）
    // 将被修改行存入this.editRow，方便操作成功后更新该数据
    editHandler(index, row) {
      // 对表单进行填值
      // 迭代this.form而不是row
      for (let item in this.form) {
        this.form[item] = row[item];
      }

      // 打开表单弹窗
      this.dialogFormVisible = true;

      // 设置axios的ajax请求parms的method为EDIT
      this.requestParams.method = 'edit';

      // 将被修改行存入this.editRow，方便操作成功后更新该数据
      this.editRow = row;
    },
    // 保存按钮
    // 请求method在弹窗打开时已经设置
    // 设置请求参数
    saveRow() {
      this.$refs.form.validate(result => {
        var newData = {};

        if (result) {
          // 直接将表单提交，axios默认将数据转化为json
          this.requestParams.data = this.form;

          // 发起添加请求
          crud(this.requestParams).then(res => {
            // 后台返回成功
            if (res.status >= 200 && res.status <= 300) {
              let msg = res.data.msg,
                  index = 0;

              // 将结果存入新对象内
              // 然后再插入this.sourceData中
              // 防止后续修改对前面数据造成影响
              for (let item in this.form) {
                newData[item] = this.form[item];
              }
              // 如果是修改操作，则更新被操作数据
              // 如果是增加操作，则增加该条数据
              if (this.requestParams.method == 'edit') {
                index = this.sourceData.indexOf(this.editRow);
                this.sourceData.splice(index, 1, newData);
              } else {
                this.sourceData.splice(0, 0, newData);
              }

              // 再次设置自动完成的备选列表
              this.setAutoList();
              // console.log(index);
              this.$message({
                type: 'success',
                message: msg + '数据保存成功！'
              });

              // 关闭弹窗
              this.dialogFormVisible = false;
            }
          }, error => {
            this.$message({
              type: 'info',
              message: '数据保存失败！'
            });
          });
        } else {
          this.$message({
            type: 'info',
            message: '数据验证失败，请检查数据！！'
          });
        }
      });
    },
    // 重新加载按钮
    reloadHandler() {
      this.$confirm('此操作将重新从后台请求数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        // 确认重新加载后运行this.getData();
        this.getData();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 对列进行格式化
    // 主要是对时间格式进行格式化显示
    tableFormat(row, column, cellValue) {
      var string = '',
          date = null;

      if (this.format.date.indexOf(column.property) >= 0) {
        // cellValue不为空、null、undefined时才进行格式化，
        // 否则返回空字符串
        if (cellValue) {
          date = new Date(cellValue);
          string = date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate();
        } else {
          string = '';
        }
        cellValue = string;
      }

      return cellValue;
    }
  },
  // 0、设置请求参数中的请求表格名
  // 1、获取页面表格配置文件
  // 2、添加需要双向数据绑定的字段（表单字段以及自动完成输入框字段）
  // 3、获取原始表格数据
  // 4、加载表单验证规则
  mounted() {
    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered

      // 0、设置请求参数中的请求表格名
      this.requestParams.name = this.$route.name;

      // 1、获取页面表格配置文件
      var config = tableViewConfig[this.$route.name];
      this.datagridConfig = config;

      // 如果没有对应的config
      // 则直接跳转到404页面
      if (!config) {
        this.$router.replace({name: '404'});
        return;
      }
      // 2、添加需要双向数据绑定的字段（表单字段以及自动完成输入框字段）
      // 添加双向绑定的表单字段
      // 同时添加双向绑定的自动完成字段
      // 同时添加需要格式化的字段
      for (let i = 0; i < config.length; i++) {

        // 日期字段需要进行format，所以将这些字段存储起来
        if (config[i].type.indexOf('date') >= 0) {
          this.format.date.splice(0, 0, config[i].field)
        }

        this.$set(this.form, config[i].field, '');

        // 如果需要添加自动完成，而且没有预设该字段，则使用this.$set添加该字段
        if (config[i].autoComplete && !this.autoComplete[config[i].field]) {
          this.$set(this.autoComplete, config[i].field, []);
        }
      }

      // 3、获取原始表格数据
      this.getData();

      // 4、加载表单验证规则
      this.rules = rules;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .edit-button {
    height: 50px;
    overflow: auto;
  }
  /*行内表单的高度*/
  .inline-form {
    height: 50px;
  }
</style>


