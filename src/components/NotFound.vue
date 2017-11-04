<template>
  <div>
    <p class="page-container">404 page not found</p>
    <p>
      您可以点击这里
      <el-button type="text" @click.prevent='goToHome'>回到首页</el-button>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ path: '/' });
    }
  }
}
</script>
