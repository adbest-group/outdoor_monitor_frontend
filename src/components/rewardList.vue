<template>
  <div class="reward-list">
    <ul v-if="detailList.length > 0">
      <li class="reward-detail" v-for="(detail, index) in detailList" :key="index">
        <h4 class="reward-date">{{detail.date}}</h4>
        <div class="reward clearfix">
          <span class="left-time">{{detail.time}}</span>
          <span class="right-reward">{{detail.reward}}元</span>
        </div>
      </li>
    </ul>
    <p v-else class="no-list" >暂时还没有获得任何奖励</p>
  </div>
</template>
<script>
export default {
  props: {
    detailList: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .reward-list{
    .reward-detail{
      padding: .15rem 0;

      .reward-date {
        width: 1.7rem;
        height: .54rem;
        line-height: .54rem;
        text-align: center;
        background-color: #26a2ff;
        color: #fff;
        position: relative;

        &::after{
          position: absolute;
          content: '';
          left: 100%;
          border: .27rem solid transparent;
          border-left: .27rem solid #26a2ff;
        }
      }

      .reward{
        padding: .15rem .35rem;
        font-size: .3rem;

        .left-time{
          float: left;
        }
        .right-reward{
          float: right;
          color: red;
        }
      }
    }

    .no-list{
      margin-top: .4rem;
      text-align: center;
      color: #999;
      font-size: .5rem;
    }
  }
</style>
