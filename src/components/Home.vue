<template>
  <!-- 主容器 -->
  <div class="fenix-container" :class='isCollapse ? "fenix-hideSidebar" : ""'>
    <!-- 头部 -->
    <div class="fenix-header">
      <!-- logo区 -->
      <div class="fenix-header-logo">
        <fenix-logo></fenix-logo>
      </div>
      <!--用户信息菜单区 -->
      <div class="fenix-header-navbar">
        <fenix-logo-nav></fenix-logo-nav>
      </div>
    </div>
    <!-- 中间部分 -->
    <!-- 左侧菜单区 -->
    <div class="fenix-main-aside">
      <fenix-aside></fenix-aside>
    </div>
    <!-- 右侧主体展示区 -->
    <div class="fenix-main-view">
      <fenix-main></fenix-main>
    </div>
    <!-- 底部 -->
    <div class="fenix-footer">
      <!-- 版权声明 -->
      <fenix-copyright></fenix-copyright>
    </div>
  </div>
</template>

<script>
import Logo from './header/Logo'
import LogoNav from './header/Logonav'
import Aside from './aside/Aside'
import Main from './main/Main'
import Copyright from './footer/Copyright'

export default {
  name: 'home',
  components: {
    'fenix-logo': Logo,
    'fenix-logo-nav': LogoNav,
    'fenix-aside': Aside,
    'fenix-main': Main,
    'fenix-copyright': Copyright
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isCollapse
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*防止导航宽度问题，设置页面的最低宽度*/
/*设置整个页面文字左对齐*/
.fenix-container {
  text-align: left;
  height: 100%;
  width: 100%;
}

/*头部和底部使用相同的背景和前景色*/
.fenix-header, .fenix-footer {
  background-color: #324057;
  color: #fff;
  position: fixed;
  z-index: 1001;
  left: 10px;
  right: 10px;
}
.fenix-header {
  top: 10px;
  height: 60px;
}

.fenix-header-logo {
  float: left;
}
.fenix-header-navbar {
  float: right;
}

.fenix-footer {
  bottom: 10px;
  height: 30px;
}

.fenix-main-aside {
  position: fixed;
  /*左侧菜单栏背景色设置和菜单颜色一致*/
  background-color: #475669;
  z-index: 1001;
  top: 80px;
  left: 10px;
  bottom: 50px;
  width: 200px;
  /* .3s ease-in-out两个属性设置和menu默认配置一样，不可更改 */
  transition: width .3s ease-in-out;
}

.fenix-main-aside::-webkit-scrollbar {display:none}

.fenix-main-view {
  overflow: auto;
  position: fixed;
  left: 220px;
  right: 10px;
  top: 80px;
  bottom: 50px;
  transition: left .3s ease-in-out;
}
.fenix-container.fenix-hideSidebar .fenix-main-aside{
  width: 64px;
}
.fenix-container.fenix-hideSidebar .fenix-main-view{
  left: 84px;
}
</style>
