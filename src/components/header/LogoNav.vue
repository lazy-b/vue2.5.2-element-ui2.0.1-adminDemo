<template>
  <div>
    <div class="role-info">
      <el-dropdown
        :show-timeout='timeout'
        @command='handleCommand'
        type="primary">
        <span class="el-dropdown-link">
          {{userName}} <i class="el-icon-setting el-icon--right big"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showUserInfo">
            个人信息
          </el-dropdown-item>
          <!-- 切换账户思路 -->
          <!-- 1、直接在本页面进行弹出一个登录表单，登录成功后将前一个用户注销 -->
          <!-- 登录失败则关闭登录弹窗，且不做注销动作 -->
          <!-- 2、直接注销用户并跳转到登录页面，实际上就和退出一样 -->
          <!-- 感觉没啥用，还麻烦，先不实现了 -->
<!--           <el-dropdown-item @clice.prevent='showUserInfo'>
            切换账户
          </el-dropdown-item> -->
          <el-dropdown-item divided command="logOut">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="role">
      <p>欢迎您！</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
        return {
          timeout: 0  // 下拉菜单出现的延时
        }
    },
    computed: {
      ...mapGetters([
          'userName',
          'roles',
          'menuRoutes'
        ])
    },
    methods: {
      // 使用element的指令事件进行处理
      handleCommand(command) {
        // 展示用户信息
        if (command === 'showUserInfo') {
          this.showUserInfo();
        }

        // 退出
        if (command === 'logOut') {
          this.logOut();
        }
      },
      showUserInfo() {
        // 获得用户信息页面对应的route对象
        const routes = this.menuRoutes.filter(function (route) {
          return route.name === 'userInfo';
        });

        // 跳转到用户信息页面
        this.$router.push({ name: 'userInfo' });
      },
      logOut() {
        // 向后端发起退出请求
        // 请求成功跳转到登录页面
        // 否则只弹出提示
        this.$store.dispatch('LogOut').then(res => {
          this.$message({
            type: 'success',
            message: '退出成功，正在跳转登录页面...'
          });
          this.$router.push({ name: 'login' })
        }, err => {
          this.$message({
            type: 'error',
            message: '退出失败，请重试！！！'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*角色区*/
.role, .role-info {
  float: right;
  line-height: 60px;
}
.role p{
  margin: 0;
}
.role-info {
  width: 100px;
  margin: 0 30px;
}

/*下拉列表区*/
.big {
  font-size: 25px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-dropdown-link:hover, .el-dropdown-link:active{
  color: #409EFF;
}
.el-icon-caret-bottom {
  font-size: 12px;
}
</style>
