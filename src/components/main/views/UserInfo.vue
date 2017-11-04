<template>
  <!-- 展示个人信息 -->
  <div class="show" v-if='!edit'>
    <!-- 编辑按钮 -->
    <el-row>
      <el-col :span="6">
        <el-button type="primary" @click.prevent='edit = true'>
            编辑个人资料
            <i class="el-icon-edit"></i>
        </el-button>
      </el-col>
    </el-row>
    <!-- 用户昵称行 -->
    <el-row class="username">
      <el-col :span="6">
        <p>用户昵称(username)：</p>
      </el-col>
      <el-col :span="17" :offset='1'>
        <p>{{userName}}</p>
      </el-col>
    </el-row>
    <!-- 用户头像行 -->
    <el-row class="avatar">
      <el-col :span="6">
        <p>用户头像(avatar)：</p>
      </el-col>
      <el-col :span="17" :offset='1'>
        <img :src='avatar' alt="用户头像">
      </el-col>
    </el-row>
  </div>
  <!-- 编辑个人信息 -->
  <div class="edit" v-else>
    <el-form>
      头像上传：
      <el-upload
        class="avatar-uploader"
        action=""
        accept="image/*"
        :auto-upload='false'
        :show-file-list="false"
        :on-change='onChange'>
        <img v-if="imageUrl" :src="imageUrl" class="avatar-show">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit">确认修改</el-button>
        <el-button @click.prevent='edit = false'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { editInfo } from '@/api/user'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        edit: false,
        imageUrl: '',
        file: {}
      }
    },
    computed: {
      ...mapGetters([
          'userName',
          'avatar'
        ])
    },
    methods: {
      onSubmit() {
        // this.$refs.uploadFiles.submit();
        // 在已经选择了文件类型的情况下才进行上传操作，否则弹出提示框
        if (this.imageUrl) {
          // 仍然使用FormData手动序列化
          // 预备以后需要同时发送图片和表单
          let formData = new FormData();

          formData.append('avatar', this.file);

          // 调用文件上传api
          editInfo(formData, { 'username' : this.userName}).then(res => {
            // 该文件上传成功
            this.$message.success('恭喜您！个人信息修改成功！！！');
            this.edit = false;
            // console.log(res.data.msg)
          }, err => {
            // 该文件上传失败
            // 点击“取消修改”返回个人信息界面
            // 点击“仍然尝试”继续修改
            this.$confirm('很遗憾！此次修改个人信息失败！您可以点击取消修改放弃本次修改，或者点击仍然尝试重新尝试修改！',
                          '提示信息', {
              confirmButtonText: '取消修改',
              cancelButtonText: '仍然尝试',
              type: 'info'
            }).then(() => {
              this.edit = false;
              this.$message({
                type: 'info',
                message: '个人信息未修改！'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '请确认信息无误后重新提交！'
              });
            });
          });
        }
      },
      // 用户选择文件处理函数
      onChange(file, fileList) {
        // 如果不是第一次选择则把前一次选择生成的DOMString释放掉
        if (this.imageUrl) {
          URL.revokeObjectURL(this.imageUrl);
        }

        this.file = file;
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 个人信息展示 */
  .el-row {
    border-bottom: 1px dotted #ccc;
    vertical-align: middle;
  }

  .el-row .el-col:nth-child(1) {
    color: #2D2F33;
    text-align: right;
  }

  /* 个人信息修改 */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-show {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
