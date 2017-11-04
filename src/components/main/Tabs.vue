<template>
  <div class="fenix-tabs">
    <!-- 单击icon实现左侧菜单栏收起或者打开 -->
    <div
      class="fenix-aside-icon"
      @click.prevent="iconClick">
      <i class="el-icon-menu"></i>
    </div>
    <!-- 视图对应tab标签 -->
    <el-tabs
      v-model="activeName"
      class="fenix-tabs"
      @tab-click="tabHandleClick"
      @tab-remove="removeTab">
      <!-- 第一个标签为默认标签，不可关闭 -->
      <el-tab-pane
        v-for='(tab, index) in viewTabs'
        :closable='tab.name !== "welcome"'
        :name='tab.name'
        :path='tab.path'
        :key='tab.name + index + 1'
        :label='tab.label'>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
      return {
        activeName: ''
      }
    },
    computed: {
      viewTabs() {
        return this.$store.getters.viewTabs;
      }
    },
    watch: {
      // 根据当前route添加tabs
      $route:  {
        handler: function(val, oldVal) {
          this.$store.dispatch('addTab', val);
          this.activeName = val.name;
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      iconClick() {
        this.$store.dispatch('setIsCollapse');
      },
      tabHandleClick(tab) {
        // 如果被点击的tab的$attrs.path和当前路径不同，则进行跳转
        if (tab.$attrs.path !== this.$route.path) {
          this.$router.push({ path: tab.$attrs.path });
        }
      },
      removeTab(targetName) {
        const tabs = this.viewTabs;

        // 循环遍历tabs，找出被删除的tab
        tabs.forEach((tab, index) => {

          // 如果标签的name和传入的targetName相同，则认为该tab被点击
          if (tab.name === targetName) {
            // 如果被删除的tab就是当前激活的tab
            // 则需要重新设置被激活的tab
            // 同时激活新的视口
            if (this.activeName === targetName) {
              // 如果被删除tab后面还有tab，则激活后面的tab，否则激活前一个tab
              const nextTab = tabs[index + 1] || tabs[index - 1];

              // 如果这个tab存在，则激活之
              if (nextTab) {
                // 设置被激活的tab
                this.activeName = nextTab.name;
                // 激活新的视口
                this.$router.push(nextTab.path);
              }
            }

            // 在tabs中删除该tab
            this.$store.dispatch('deleteTab', tab);
          }
        });
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fenix-aside-icon {
  float: left;
  line-height: 38px;
  vertical-align: middle;
  font-size: 30px;
  padding: 0 10px 0 0;
  border-bottom: 2px solid #dfe4ed;
  position: relative;
  z-index: 1;
}

.fenix-aside-icon:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
