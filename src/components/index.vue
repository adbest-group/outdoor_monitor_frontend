    <!-- <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <div>
        <div class="qr-btn" node-type="qr-btn">扫描二维码1
            <input node-type="jsbridge" type="file" name="myPhoto" value="扫描二维码1" />
        </div>
    </div>
     <div class="result-qrcode">
    </div> -->
<template>
  <div class="page-tabbar">
    <div class="page-wrap">
    <!-- tabcontainer -->
      <header-inner></header-inner>
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
import '../config/qrcodeRequire'
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
input[node-type=jsbridge]{
    display:none;
}
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
</style>
