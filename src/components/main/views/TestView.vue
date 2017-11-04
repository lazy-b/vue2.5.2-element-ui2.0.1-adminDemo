<template>
  <div>
    <h2>{{userName}}，欢迎您！</h2>
  </div>
</template>
<script>
  export default {
    computed: {
      userName() {
        return this.$store.getters.userName;
      }
    }
  }
</script>
