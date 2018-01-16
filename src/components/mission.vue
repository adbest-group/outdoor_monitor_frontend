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
        <mt-cell title="标题文字" to="/monitor" is-link>
          <span style="color: green">监测</span>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!-- 执行中列表 -->
        <mt-cell title="标题文字" to="/monitor" is-link>
          <span style="color: green">查看</span>
        </mt-cell>
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
        <mt-cell label="已审核通过" title="标题文字" to="/photoCheck?aaa=1" is-link>
          <span style="color: green">查看</span>
        </mt-cell>
        <mt-cell label="未审核通过" title="标题文字" to="/photoCheck" is-link>
          <span style="color: green">查看</span>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '1',
      value: '全部',
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
      ]
    }
  },
  methods: {
    clicka () {
      alert('a')
    }
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
