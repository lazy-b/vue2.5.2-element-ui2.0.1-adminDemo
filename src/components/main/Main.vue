<template>
  <div id="main">
    <my-tabs class="my-tabs"></my-tabs>
    <!-- 缓存不活动的组件 -->
    <!-- 1、加了key后每次请求都会加载新的组件，缓存没有意义 -->
    <!-- 2、keep-alive和key同时使用将导致路由不能正确跳转 -->
    <!-- 具体表现为可以由父路径跳到子路径，但是由子路径跳到父路径平级路径则被跳转 到404页面 -->
    <!-- <keep-alive> -->
    <!-- 使用key使得动态路由不再复用组件，而是每次跳转都重新加载 -->
      <router-view :key="key"></router-view>
    <!-- </keep-alive> -->
    <!-- <my-datagrid></my-datagrid> -->
  </div>
</template>

<script>
import Tabs from './Tabs'

export default {
  components: {
    'my-tabs': Tabs
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-tabs {
    height: 50px;
    position: relative;
  }
</style>
