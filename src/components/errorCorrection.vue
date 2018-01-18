<template>
  <div class="error">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">已提交纠错</mt-tab-item>
      <mt-tab-item id="3" v-show="userType === 0">已处理完成</mt-tab-item>
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
  </div>
</template>

<script>
import listCell from '../components/listCell'
export default {
  data () {
    return {
      selected: '1',
      value: '全部',
      userType: 0,
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

  },
  components: {
    listCell
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
  }
</style>
