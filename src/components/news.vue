<template>
  <div class="news">
    <el-collapse @change="handleChange">
      <el-collapse-item v-for="item in activities" :key="item.index">
        <template slot="title">
          {{item.activity_name}}
        </template>
        <div><span>投放中</span><span>{{item.delivery_num}}</span></div>
        <div><span>监测中</span><span>{{item.monitor_num}}</span></div>
        <div><span>报错</span><span>{{item.error_num}}</span></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import GLOBAL from '../config/global'
export default {
  data () {
    return {
      activeNames: ['1'],
      activities: [{// 咨询列表
        'activity_name': 'KFC  CNY闻鸡起舞堡',
        'delivery_num': 100,
        'monitor_num': 100,
        'error_num': 20
      },
      {// 咨询列表
        'activity_name': 'KFC  CNY闻鸡起舞堡',
        'delivery_num': 100,
        'monitor_num': 100,
        'error_num': 20
      }],
      currentUser: {}
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    getActivities () {
      this.axios({
        url: GLOBAL.URL.GET_NEWS,
        method: 'post',
        data: {
          user_id: this.user_id
        }
      }).then((r) => {
        console.log('咨询', r)
        this.activities = r.data.activities
      })
    },
    created () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
