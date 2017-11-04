<template>
  <!-- 使用绝对路径，否则路径跳转有bug -->
  <div class="fenix-aside">
    <el-menu
      router
      :collapse="isCollapse"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#475669"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 内部使用递归实现无限层数菜单 -->
      <!-- 参考：harsima的博客》》Vue + ElementUI 手撸后台管理网站基本框架(三)登录及系统菜单加载 -->
      <fenix-menu-item
        v-for='(route, i) in routes'
        :route='route'
        :key='route.path'>
      </fenix-menu-item>
    </el-menu>
  </div>
</template>

<script>
import MenuItem from './menuItem'
export default {
  name: 'fenix-aside',
  components: {
    'fenix-menu-item': MenuItem
  },
  computed: {
    routes() {
      return this.$store.getters.menuRoutes
    },
    isCollapse() {
      return this.$store.getters.isCollapse
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background-color: #fff;
    color: green;
  }
</style>
