<template>
  <div class="listCell">
    <ul v-if="list.length > 0">
      <template v-if="list" v-for="cell in list">
        <li
          class="cell"
          :key="cell.task_id"
          @click="toLink(cell.ad_status,cell)" v-if="cell.ad_status === 4 && isChecked !=='3' || cell.ad_status === 5 && isChecked !=='2' || cell.ad_status === 1 || cell.ad_status === 6 || cell.ad_status === 2 || cell.ad_status === 3">

          <div v-if="showStatus(cell.ad_status)"
              class="ad-status"
              :class="statusClass(cell.ad_status)">
                {{statusText(cell.ad_status)}}
          </div>
          <div class="ad-name" v-if="type ===1">({{cell.task_type_text}}) {{cell.ad_name}}</div>
          <div class="ad-name" v-else>({{cell.monitor_time}}) {{cell.ad_name}}</div>
          <div class="ad-see">
            {{(cell.ad_status === 2 || cell.ad_status === 6) && type === 1 ? '监测' : '查看'}}
            <span class="el-icon-arrow-right"></span>
          </div>
        </li>
      </template>
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
    },
    type: { // 1 为任务  2 为纠错
      type: Number,
      default: 1
    },
    isChecked: {
      type: String,
      default: '1'// 展示全部审核（包含已审核和未审核）
    }
  },
  methods: {
    toLink (status, cell) { // 跳转链接
      sessionStorage.setItem('currentTask', JSON.stringify(cell))
      if (this.type === 1) {
        if (status === 2 || status === 6) { // 监测
          this.$router.push({path: '/monitor'})
        } else {
          this.$router.push({path: '/photoCheck', query: {'status': status}})
        }
      } else { // 2纠错，只能查看
        this.$router.push({path: '/errorCheck', query: {'status': status}})
      }
    },
    statusClass (status) { // 状态样式
      if (this.type === 1) {
        switch (status) {
          case 4: return 'status-success'
          case 5: return 'status-fail'
        }
      } else if (this.type === 2) {
        switch (status) {
          case 2: return 'status-success'
          case 3: return 'status-fail'
        }
      }
    },
    statusText (status) { // 状态内容
      if (this.type === 1) { // 任务
        switch (status) {
          case 2: return '待执行'
          case 3: return '审核中'
          case 4: return '通过审核'
          case 5: return '未通过审核'
        }
      } else if (this.type === 2) { // 纠错
        switch (status) {
          case 1: return '待审核'
          case 2: return '通过审核'
          case 3: return '未通过审核'
        }
      }
    },
    showStatus (status) { // 是否显示审核结果
      if (this.type === 1 && (status === 4 || status === 5 || status === 6)) {
        return true
      } else if (this.type === 2 && (status === 3 || status === 2)) {
        return true
      } else {
        return false
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
        padding-left:0.1rem;
        line-height: $height;
        text-align: center;

        &.status-success{
          color: #42b983;
        }
        &.status-fail{
          color: red;
        }
      }

      .ad-name{
        flex: 1;
        padding-left:0.1rem;
        line-height: $height;
        font-size: .24rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .ad-see{
        width: 1.3rem;
        line-height: $height;
        color: green;
        font-size: .24rem;

        .el-icon-arrow-right{
          color: #999;
        }
      }

    }
    .cell:last-child{
      margin-bottom:0.6rem;
    }
    .no-list{
      text-align: center;
      color: #999;
      font-size: .5rem;
    }
  }
</style>
