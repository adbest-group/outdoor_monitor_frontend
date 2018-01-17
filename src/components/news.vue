<template>
  <div class="news">
    <el-collapse @change="handleChange">
      <el-collapse-item v-for="item in activities" :key="item.index" class="news-title">
        <template slot="title">
          {{item.activity_name}}
        </template>
        <div class="news-item">
          <span class="item-left">投放中</span>
          <span class="item-right status-success">{{item.delivery_num}}</span>
        </div>
        <div class="news-item">
          <span class="item-left">监测中</span>
          <span class="item-right status-executed">{{item.monitor_num}}</span>
        </div>
        <div class="news-item">
          <span class="item-left">报错</span>
          <span class="item-right status-error">{{item.error_num}}</span>
        </div>
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
  .news{
    .news-title{
      text-indent: .15rem;
    }

    .news-item{
      padding: 0.1rem;
      border-bottom: 1px solid #ddd;
      display: flex;

      .item-left{
        flex: 1;
        color: #26a2ff;
      }

      .item-right{
        width: 1rem;
        color: #fff;
        background-color: red;
        text-align: center;
        text-indent: 0;

        &.status-success{
          background: #42b983;
        }
        &.status-executed{
          background: #26a2ff;
        }
        &.status-error{
          background: red;
        }
      }
    }
  }

</style>
