<template>
  <div id="app">
    <keep-alive include="Index">
      <router-view></router-view>
    </keep-alive>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './assets/css/base';
@import './assets/css/common';
@import './assets/iconfont/iconfont.css';
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px; */
}
</style>
