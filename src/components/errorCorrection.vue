<template>
  <div class="error">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">已提交纠错</mt-tab-item>
      <mt-tab-item id="3" v-show="userType === '1'">已处理完成</mt-tab-item>
    </mt-navbar>
<!-- tab-container -->
    <mt-tab-container v-model="selected">
      <!-- <button @click="clicka()">fasfadsfsad</button> -->
      <mt-tab-container-item id="1">
        <!-- 待执行列表 -->
        <list-cell :list='jiucuoList.jiucuo_submit' :type="2"></list-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!-- 执行中列表 -->
        <list-cell :list='jiucuoList.jiucuo_submit' :type="2"></list-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" class="verifiedMission">
        <!-- 已审核列表 -->
        <list-cell :list='jiucuoList.jiucuo_success' :type="2"></list-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <div @click="redirectMonitor()" class="jiucuoBtn">我要纠错</div>
  </div>
</template>

<script>
import listCell from '../components/listCell'
export default {
  data () {
    return {
      selected: '1',
      value: '全部',
      userType: '1',
      jiucuoList: {
        'jiucuo_submit': [{
          'task_id': '12',
          'task_name': '南京西路地铁灯箱-1监测任务',
          'ad_activity_name': 'KFC  CNY闻鸡起舞堡',
          'ad_name': '南京西路地铁灯箱-1',
          'monitor_time': '2018/01/16',
          'ad_location': '人民广场候车亭-1',
          'ad_status': '1', // 待审核
          'feedback': '',
          'img_url_list': ['http://xxx/1.jpg', 'http://xxx/2.jpg', 'http://xxx/3.jpg']
        }],
        'jiucuo_success': [{
          'task_id': '12',
          'task_name': '南京西路地铁灯箱-1监测任务',
          'ad_activity_name': 'KFC  CNY闻鸡起舞堡',
          'ad_name': '南京西路地铁灯箱-1',
          'monitor_time': '2018/01/16',
          'ad_location': '人民广场候车亭-1',
          'ad_status': '2', // 2：通过审核 3：未通过审核
          'feedback': '',
          'img_url_list': ['http://xxx/1.jpg', 'http://xxx/2.jpg', 'http://xxx/3.jpg']
        }]
      }
    }
  },
  methods: {
    redirectMonitor () {
      this.$store.commit('setCurrentType', '2')
      this.$router.push({path: '/monitor'})
    }
  },
  components: {
    listCell
  },
  created () {
    this.userType = this.$store.getters.getCurrentUser.userType
  }
}
</script>

<style lang="scss" scoped>
  .error{
    .verifiedMission{
      .condition{
        margin-top:0.02rem;
        margin-bottom:0.02rem;
      }
    }
    .jiucuoBtn{
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
