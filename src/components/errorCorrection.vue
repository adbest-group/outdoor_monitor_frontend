<template>
  <div class="error">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">已提交纠错</mt-tab-item>
      <mt-tab-item id="2">纠错处理中</mt-tab-item>
      <mt-tab-item id="3">已处理完成</mt-tab-item>
    </mt-navbar>
<!-- tab-container -->
    <mt-tab-container v-model="selected">
      <!-- <button @click="clicka()">fasfadsfsad</button> -->
      <mt-tab-container-item id="1">
        <!-- 待执行列表 -->
        <mt-cell title="南京西路地铁灯箱-1" to="/errorCheck" is-link>
          <span style="color: green">查看</span>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <!-- 执行中列表 -->
        <mt-cell title="标题文字" to="/errorCheck" is-link>
          <span style="color: green">查看</span>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" class="verifiedMission">
        <!-- 已审核列表 -->
        <mt-cell title="标题文字" to="/errorCheck" is-link>
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
      userType: '1'
    }
  },
  methods: {

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
