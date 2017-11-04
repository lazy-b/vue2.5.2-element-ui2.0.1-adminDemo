<template>
  <div class="logo">
    <img :src='logo' :alt='logoAlt'>
    <h1>{{companyName}}</h1>
  </div>
</template>

<script>
export default {
  data () {
      return {
        logo: 'http://dummyimage.com/200X60/000/fff.png&text=假装是LOGO',
        logoAlt: 'logo',
        companyName: '假装自己是公司名'
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*公共区域*/
.logo {
  text-align: left;
  padding-left: 20px;
  height: 60px;
  overflow: hidden;
}

.logo img {
  float: left;
}

.logo h1{
  padding: 0;
  margin: 0 0 0 220px;
  line-height: 60px;
}
</style>
