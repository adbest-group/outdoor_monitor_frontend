<template>
  <div class="error">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">已提交纠错</mt-tab-item>
      <mt-tab-item id="3">已处理完成</mt-tab-item>
    </mt-navbar>
<!-- tab-container -->
    <mt-tab-container v-model="selected">
      <!-- <button @click="clicka()">fasfadsfsad</button> -->
      <mt-tab-container-item id="1">
        <!-- 待执行列表 -->
        <list-cell v-if="jiucuoList.jiucuo_submit" :list='jiucuoList.jiucuo_submit' :type="2"></list-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" class="verifiedMission">
        <!-- 已审核列表 -->
        <list-cell v-if="jiucuoList.jiucuo_success" :list='jiucuoList.jiucuo_success' :type="2"></list-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- <div @click="redirectMonitor()" class="jiucuoBtn">我要纠错</div> -->
    <div>
          <div class="qr-btn" @click="uploadWrap()">我要纠错
              <input ref="firstInput" node-type="jsbridge" type="file" @change="imgPhoto()" value="扫描二维码" accept="image/*" capture="camera" />
          </div>
      </div>
      <wrapper :if-display="ifDisplay"></wrapper>
  </div>
</template>

<script>
// <mt-tab-container-item id="2">
//         <!-- 执行中列表 -->
//         <list-cell v-if="jiucuoList.jiucuo_submit" :list='jiucuoList.jiucuo_submit' :type="2"></list-cell>
//       </mt-tab-container-item>
import listCell from '../components/listCell'
// import { initBtn } from '../config/qrcodeRequire'
import qrcodeMixin from '../mixins/qrcodeMixin'
import GLOBAL from '../config/global'
export default {
  data () {
    return {
      selected: '1',
      value: '全部',
      userType: '1',
      jiucuoList: {}
    }
  },
  mixins: [qrcodeMixin],
  methods: {
    getTaskList () {
      this.axios({
        url: GLOBAL.URL.GET_TASK_LIST,
        method: 'post',
        data: {
          type: 2 // 纠错列表
        }
      }).then((r) => {
        this.jiucuoList = r.ret.result
      })
    }
  },
  watch: {
    selected (val) {
      this.getTaskList()
    }
  },
  components: {
    listCell
  },
  activated () {
    this.userType = JSON.parse(sessionStorage.getItem('currentUser')).userType
    sessionStorage.setItem('currentType', '2')
    this.getTaskList()
  },
  created () {
    this.userType = JSON.parse(sessionStorage.getItem('currentUser')).userType
    // console.log(this.userType)
    // this.$store.commit('setCurrentType', '2')// 纠错
    sessionStorage.setItem('currentType', '2')
    this.getTaskList()
  }
}
</script>

<style lang="scss" scoped>
  .error{
    input[node-type=jsbridge]{
        display:none;
    }
    .verifiedMission{
      .condition{
        margin-top:0.02rem;
        margin-bottom:0.02rem;
      }
    }
    .qr-btn{
      position: fixed;
      bottom: 1.28rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1.4rem;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      font-size: .26rem;
      background-color: #26a2ff;

      &::after{
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1.4rem;
        height: 1.4rem;
        transform: translate(-50%, -50%);
        z-index: -1;
        background-color: rgba(38, 162, 255, .7);
        border-radius: 50%;
        animation: btnShadow 3s infinite;
      }
    }
  }

  @keyframes btnShadow {
    0%{
      background-color: rgba(38, 162, 255, .7);
      width: 1.4rem;
      height: 1.4rem;
    }

    50% {
      background-color: rgba(38, 162, 255, .5);
      width: 1.6rem;
      height: 1.6rem;
    }

    100% {
      background-color: rgba(38, 162, 255, 0);
      width: 1.8rem;
      height: 1.8rem;
    }
  }
</style>
