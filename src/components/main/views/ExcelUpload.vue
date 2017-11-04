<template>
  <div class="fenix-upload">
    <el-form>
      <div class="fenix-tip">请先选择上传EXCEL的类型：</div>
      <el-cascader
        expand-trigger="hover"
        :options="options"
        v-model="selectValue">
      </el-cascader>
      <el-button
        size="small"
        type="success"
        round
        @click="submitUpload">
        上传到服务器
      </el-button>
      <!-- data为上传时附带的参数 -->
      <el-upload
        class=""
        drag
        ref="uploadFiles"
        :show-file-list='false'
        :on-change='onChange'
        :before-upload="beforeUpload"
        accept=".xls,.xlsx"
        :auto-upload='false'
        action=""
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="fenix-tip" slot="tip">只能上传xls/xlsx文件</div>
      </el-upload>
    </el-form>
    <div class="fileInfo">
      <div
        class="info-container"
        v-for='(fileInfo, index) in fileInfos'>
          <div>
            <p>{{index + 1}} 、{{fileInfo.file.name}} </p>
          </div>
          <div>
            <el-tooltip
              effect="dark"
              :content='fileInfo.upload ?
                (fileInfo.success ?
                  "该文件上传成功" :
                  "该文件上传失败，点击此处删除或者点击上传按钮继续尝试") :
                "点击按钮取消该文件上传" '
              placement="top">
              <!-- :type='afterUpload ? "success" : "warning"' -->
              <el-button
                @click.prevent='fileInfo.success ? "" : deleteFile(fileInfo.file)'
                size="mini"
                :class='fileInfo.upload ? (fileInfo.success ? "upload-success" : "upload-failure") : "upload-before"'
                round
                type="text"
                :icon='fileInfo.upload ? (fileInfo.success ? "el-icon-success" : "el-icon-warning") : "el-icon-circle-close"'>
              </el-button>
            </el-tooltip>
            <p>文件大小：{{fileInfo.formativeSize}} </p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadFile } from '@/api/file'
export default {
  data () {
    return {
      fileInfos: [],
      success: false,
      afterUpload: false,
      selectValue: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
      }]
    };
  },
  methods: {
    // 点击删除按钮，删除fileInfos中对应该文件的项
    deleteFile(file) {
      for (let i = 0; i < this.fileInfos.length; i++) {
        if (this.fileInfos[i].file.name === file.name && this.fileInfos[i].file.size === file.size) {
          this.fileInfos.splice(i, 1);
        }
      }
    },
    // 点击新增文件区域，在fileInfos中增加对应的文件信息
    // 自定义事件无法获取fileList数据，故放弃fileList进行操作
    onChange(file, fileList) {
      // window.testfile = file;
      // window.testfilelist = fileList;
      let fileInfo = {};

      // 判断fileInfos中是否存在该文件
      const isExist = this.fileInfos.some(function(fileInfo) {
        return fileInfo.file.name === file.name && fileInfo.file.size === file.size;
      });

      // 如果集合中已经有了和传入file相同的文件，则将刚传入的file删除
      // 否则将该文件信息展示出来
      if (!isExist) {
        // 格式化之后的文件大小
        fileInfo.formativeSize = file.size/1024/1024 >= 1 ?
                        (file.size/1024/1024).toFixed(2) + 'MB' :
                        (file.size/1024).toFixed(2) + 'KB';
        // 文件对象
        fileInfo.file = file;
        // 文件是否已经上传
        fileInfo.upload = false;
        // 文件是否上传成功
        fileInfo.success = false;

        this.fileInfos.push(fileInfo);
      } else {
        this.$message.error('相同文件已存在，请确认、、、');
      }
    },
    // 点击文件上传按钮
    submitUpload() {
      // this.$refs.uploadFiles.submit();
      // 在已经选择了文件类型的情况下才进行上传操作，否则弹出提示框
      if (this.selectValue.length > 0) {

        // 循环遍历fileInfos，分别提交包含的文件
        // 这样能够实现对单个文件上传情况的控制
        for (let i = 0; i < this.fileInfos.length; i++) {

          // 当该文件没有被上传或者上传失败时可以发起上传请求
          if (!this.fileInfos[i].success) {
            // 使用FormData对象将文件序列化
            let formData = new FormData();
            formData.append('uploadfile', this.fileInfos[i].file);

            // 调用文件上传api
            uploadFile(formData, {'uploadfileType' : this.selectValue}).then(res => {
              // console.log(res.data.uploadfileType, res.data.uploadfile, res.data.msg)
              // console.log('该文件上传成功')
              // 该文件上传成功
              this.fileInfos[i].upload = true;
              this.fileInfos[i].success = true;
            }, err => {
              // 该文件上传失败
              this.fileInfos[i].upload = true;
              this.fileInfos[i].success = false;
              // console.log('该文件上传失败')
            });
          }
        }
      } else {
        this.$message.error('必须选择文件类型！！！');
      }
    },
    // 文件上传前一个一个的进行最后的验证
    // 暂时没有这个需求
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // window.test = file;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fenix-upload {
    position: absolute;
    background-color: #fff;
    padding: 30px;
    width: 360px;
    height: 200px;
    left: 0;
    right: 0;
    top: 20px;
    margin: auto;
  }

  .el-cascader {
    margin: 10px 0;
    width: 200px;
  }
  .info-container {
    border: 1px dotted #ccc;
    margin: 5px 0;
  }

  .info-container div:nth-child(1) p{
    margin: 5px 0;
    text-indent: 1em;
    font-size: 20px;
    font-weight: 700;
  }
  .info-container div:nth-child(2) p{
    text-align: center;
  }

  .upload-before {
    color: #FA5555;
  }
  .upload-success {
    color: #67C23A;
  }
  .upload-failure {
    color: #EB9E05;
  }

  .fenix-upload button {
    float: right;
  }

  .fenix-tip {
    color: red;
  }
</style>
