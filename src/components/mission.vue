<template>
  <div class="mission">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">待执行</mt-tab-item>
      <mt-tab-item id="2">执行中</mt-tab-item>
      <mt-tab-item id="3">已审核</mt-tab-item>
    </mt-navbar>
<!-- tab-container -->
    <mt-tab-container v-model="selected">
      <!-- <button @click="clicka()">fasfadsfsad</button> -->
      <mt-tab-container-item id="1">
        <!-- 待执行列表 -->
        <!-- <mt-cell title="标题文字" to="/monitor" is-link>
          <span style="color: green">监测</span>
        </mt-cell> -->
        <list-cell  v-if="taskList.wait_to_executed" :list='taskList.wait_to_executed'></list-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!-- 执行中列表 -->
        <list-cell v-if="taskList.executing" :list='taskList.executing'></list-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" class="verifiedMission">
        <!-- 已审核列表 -->
        <el-select class="condition" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <list-cell v-if="taskList.checked" :isChecked="ifHasChecked"  :list='taskList.checked'></list-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import GLOBAL from '../config/global'
import listCell from '../components/listCell'
export default {
  data () {
    return {
      selected: '1',
      value: '全部',
      ifHasChecked: '1', // 1展示全部2,展示已审核3,展示未审核
      options: [
        {
          value: null,
          label: '全部'
        },
        {
          value: 1,
          label: '已通过'
        }, {
          value: 0,
          label: '未通过'
        }
      ],
      taskList: {// 主任务列表假数据
      },
      userId: '',
      token: ''
    }
  },
  watch: {
    value (n, o) {
      switch (n) {
        case null:
          this.ifHasChecked = '1'
          break
        case 1:
          this.ifHasChecked = '2'
          break
        case 0:
          this.ifHasChecked = '3'
          break
        default:
          break
      }
    },
    selected (val) {
      this.getTaskList()
    }
  },
  methods: {
    getTaskList () {
      this.axios({
        url: GLOBAL.URL.GET_TASK_LIST,
        method: 'post',
        data: {
          type: 1 // 任务列表
          // user_id: this.userId// 用户id
        }
      }).then((r) => {
        this.taskList = r.ret.result
      })
    }
  },
  components: {
    listCell
  },
  activated () {
    this.getTaskList()
  },
  created () {
    this.userId = JSON.parse(sessionStorage.getItem('currentUser')).userId
    // this.token = this.$store.getters.getToken
    this.getTaskList()
  }
}
</script>

<style lang="scss" scoped>
  .mission{
    .verifiedMission{
      .condition{
        margin-top:0.02rem;
        margin-bottom:0.02rem;
      }
    }
  }
</style>
