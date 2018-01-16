<template>
  <div class="index">
    <header-inner></header-inner>
    <div>
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="任务">
          <mission></mission>
        </mt-tab-container-item>
        <mt-tab-container-item id="纠错">
          <error-correction></error-correction>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="任务">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        任务
      </mt-tab-item>
      <mt-tab-item id="纠错">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        纠错
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import HeaderInner from './header.vue'
import ErrorCorrection from './errorCorrection.vue'
import Mission from './mission.vue'
export default {
  name: 'Index',
  data () {
    return {
      selected: '任务'
    }
  },
  components: {
    ErrorCorrection,
    Mission,
    HeaderInner
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}
.mint-tabbar{
  .mint-tab-item{
   padding:0.2rem 0;
  }
}
</style>
