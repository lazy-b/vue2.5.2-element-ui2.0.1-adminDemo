<template>
  <div id="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
      <h2>系统登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input spell-check="false" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input spell-check="false" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loginLoading" @click.prevent="login">登录</el-button>
        <el-button @click.prevent="register">注册</el-button>
      </el-form-item>
    </el-form>
    <h3 class="tips">{{tips}}</h3>
    <h3>用户名可以是：admin、table、excel、visitor</h3>
    <h4>每个用户名对应不同的权限，密码随便输入<em>4-15</em>位字符</h4>
    <h4>其他用户名将被拒绝登录</h4>
    <!-- 注册表单 -->
    <el-dialog
      title="欢迎您注册账户"
      center
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="registerFormVisible">
      <el-form
        ref="registerForm"
        :rules="rules"
        :model="registerForm"
        label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input spell-check="false" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input spell-check="false" type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input spell-check="false" type="password" v-model="registerForm.passwordConfirm"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="registerLoading" @click.prevent="registerHandler">确认注册</el-button>
        <el-button @click.prevent="registerFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { registe } from '@/api/user'

export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
          ]
        },
        loginLoading: false, // 指示登录按钮是否可用
        registerLoading: false,
        tips: '', // 登录失败提示信息
        registerFormVisible: false, // 注册表单可见性
        registerForm: {
          username: '',
          password: '',
          passwordConfirm: ''
        }
      }
    },
    methods: {
      // 登录操作处理函数
      login() {
        this.loginLoading = true;
        this.$refs.loginForm.validate(result => {

          // 通过验证之后发起登录请求
          if (result) {
            this.$store.dispatch('Login', this.loginForm).then((res) => {
              // 登录成功之后跳转到首页
              // 如果服务器没有返回定制化首页，则跳转到默认首页
              // 路径'/'在route里配置了重定向到默认首页
              const homeView = res.data.homeView || '/';

              this.$router.push({ path: homeView });

              // 展示登录成功状态
              this.$message({
                type: 'success',
                message: '登录成功跳转到首页...'
              });
              this.loginLoading = false;
            }).catch(err => {
              this.tips = '用户名或密码错误，请重新输入、、、 '
              // console.log(err);

              // 重置登录按钮为可点击状态
              this.loginLoading = false;
            });
          } else {
            this.$message({
              type: 'info',
              showClose: true,
              duration: 0,
              message: '数据输入不符合要求，请检查数据！！'
            });
            this.loginLoading = false;
          }
        });
      },
      // 注册按钮--》打开注册表单
      register() {
        this.registerFormVisible = true;
      },
      // 确认注册按钮--》发起注册请求
      registerHandler() {
        this.registerLoading = true;
        this.$refs.registerForm.validate(result => {

          // 通过验证之后发起登录请求
          if (result) {
            if (this.registerForm.password === this.registerForm.passwordConfirm) {
              registe(this.registerForm).then(() => {
                this.$message({
                  type: 'success',
                  message: '注册成功，请使用该账户进行登录、、、'
                });

                // 关闭弹窗
                this.registerFormVisible = false;
                this.registerLoading = false;
              }).catch(err => {
                this.$message({
                  type: 'error',
                  message: '注册失败，请重新输入或者联系管理员、、'
                });
                this.registerLoading = false;
                // this.$message.error(err.message); // 登录失败提示错误
              });
            } else {
              this.$message({
                type: 'warning',
                message: '两次输入的密码不一致，请确认、、、'
              });
              this.registerLoading = false;
            }
          } else {
            this.$message({
              type: 'info',
              message: '数据输入不符合要求，请检查数据！！'
            });
            this.registerLoading = false;
          }
        });
      }
    }
  }

</script>
<style scoped>
  #login {
    position: absolute;
    background-color: #fff;
    padding: 30px;
    width: 300px;
    height: 260px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .tips {
    color: red;
  }
</style>
