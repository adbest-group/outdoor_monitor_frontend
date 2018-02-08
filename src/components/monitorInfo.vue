<template>
  <div class="monitorInfo">
    <back-up></back-up>
    <p class="text"><span>--广告活动画面--</span></p>
    <template v-if="currentTask">
      <div class="img">
        <img :src="currentTask.pic_url" alt="">
      </div>
      <p class="text"><span>--活动名称--</span></p>
      <p class="content"><span>{{currentTask.activity_name}}</span></p>
      <p class="text textTwo"><span>--需监测广告位--</span></p>
      <p class="content"><span>{{currentTask.ad_seat_name}}</span></p>
    </template>
    <div class="btn"><mt-button type="primary" @click.native="handleClick">确定</mt-button></div>
  </div>
</template>
<script>
import BackUp from './backUp.vue'
export default {
  data () {
    return {

    }
  },
  computed: {
    currentTask () {
      return JSON.parse(sessionStorage.getItem('currentTask'))
    }
  },
  components: {
    BackUp
  },
  methods: {
    handleClick () {
      this.$router.push('/errorPhoto')
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.monitorInfo{
  text-align: center;
  .text,.content{
    text-align: center;
    height: 0.6rem;
    line-height:0.6rem;
  }
  .text{
    color:#999;
  }
  .mint-button{
    width:100%;
    height:.56rem;
  }
  .img{
    display: inline-block;
    width:4.50rem;
    height:4.92rem;
    img{
      width:100%;
      height:100%;
    }
  }
  .btn{
    padding:0 0.64rem;
  }
}
</style>
