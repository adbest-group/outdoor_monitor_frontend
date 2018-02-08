<template>
  <div class="index">
    <header-inner></header-inner>
    <div>
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="咨询">
          <news></news>
        </mt-tab-container-item>
        <mt-tab-container-item id="任务">
          <mission></mission>
        </mt-tab-container-item>
        <mt-tab-container-item id="纠错">
          <error-correction></error-correction>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="咨询" v-if="userType === '2'">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        咨询
      </mt-tab-item>
      <mt-tab-item id="任务" v-if="userType === '1'">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        任务
      </mt-tab-item>
      <mt-tab-item id="纠错" v-if="userType === '1'|| userType === '2'">
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
import News from './news.vue'
export default {
  name: 'Index',
  data () {
    return {
      userType: '1',
      selected: '任务'
    }
  },
  components: {
    ErrorCorrection,
    Mission,
    HeaderInner,
    News
  },
  // watch: {
  //   selected (val) {
  //     alert(val)
  //   }
  // },
  methods: {
    getSelected () {
      this.selected = this.userType === '2' ? '咨询' : '任务'
    }
  },
  activated () {
    this.userType = JSON.parse(sessionStorage.getItem('currentUser')).userType
    // if (this.userType === '1') {
    //   if (this.selected === '咨询') {
    //     this.selected = '任务'
    //   }
    // } else {
    //   if (this.selected === '任务') {
    //     this.selected = '咨询'
    //   }
    // }
  },
  created () {
    this.userType = JSON.parse(sessionStorage.getItem('currentUser')).userType
    this.getSelected()
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
