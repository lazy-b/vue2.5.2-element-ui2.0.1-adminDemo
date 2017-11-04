<template>
  <!-- 使用绝对路径，否则路径跳转有bug -->
  <!-- 如果存在子节点，则使用el-submenu组件并递归调用自身 -->
  <el-submenu
    v-if='route.children && route.children.length > 0'
    :index='route.path' >
    <template slot="title">
      <i :class='route.meta.icon'></i>
      <span slot="title">{{route.meta.menuName}}</span>
    </template>
    <!-- 递归调用该组件 -->
    <fenix-menu-items
      v-for='(childRoute, i) in route.children'
      :route='childRoute'
      :key='childRoute.path'>
    </fenix-menu-items>
  </el-submenu>
  <!-- 否则直接渲染该节点 -->
  <el-menu-item
    v-else
    :route='route'
    :index='route.path'>
    <i :class='route.meta.icon'></i>
    <span slot="title">{{route.meta.menuName}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'fenix-menu-items', // name：用来进行递归调用的组件名
  props: ['route']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
