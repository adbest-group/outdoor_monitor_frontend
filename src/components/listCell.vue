<template>
  <div class="listCell">
    <ul v-if="list.length > 0">
      <router-link
        tag="li"
        class="cell"
        v-if="list"
        to="/monitor"
        v-for="cell in list"
        :key="cell.task_id">

        <div class="ad-status" :class="statusClass(cell.ad_status)">{{cell.ad_status}}</div>
        <div class="ad-name">{{cell.task_name}}</div>
        <div class="ad-see">
          {{cell.ad_status === '已派发' ? '监测' : '查看'}}
          <span class="el-icon-arrow-right"></span>
        </div>
      </router-link>
    </ul>
    <p v-else class="no-list" >暂时没有相关数据</p>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    statusClass (status) { // 状态样式
      switch (status) {
        case '已派发': return 'status-success'
        case '等待审核': return 'status-wait'
        case '未通过审核': return 'status-fail'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $height: 0.96rem;
  .listCell{
    margin-top: 3px;
    .cell{
      display: flex;
      height: $height;
      border-bottom: 1px solid #ddd;
      .ad-status{
        color: #fff;
        width: 1.45rem;
        line-height: $height;
        text-align: center;

        &.status-success{
          background: #42b983;
        }
        &.status-wait{
          background: #26a2ff;
        }
        &.status-fail{
          background: red;
        }
      }

      .ad-name{
        flex: 1;
        line-height: $height;
        margin-left: .15rem;
        font-size: .32rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .ad-see{
        width: 1.3rem;
        line-height: $height;
        color: green;
        font-size: .32rem;

        .el-icon-arrow-right{
          color: #999;
        }
      }

    }

    .no-list{
      text-align: center;
      color: #999;
      font-size: .5rem;
    }
  }
</style>
