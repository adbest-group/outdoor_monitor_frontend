<template>
  <div class="monitorInfo">
    <back-up></back-up>
    <div class="alertContnet">
      <span class="closeBtn" @click="close">X</span>
      <div class="img">

      </div>
      <p class="text">该位置正确上刊画面</p>
      <mt-button type="primary" @click.native="handleClick">确定</mt-button>
    </div>
  </div>
</template>
<script>
import BackUp from './backUp.vue'
import { isJSON } from '../config/utils'
export default {
  data () {
    return {
      info: {}// 二维码中的json格式的信息
    }
  },
  methods: {
    handleClick () {
      this.$router.push({path: '/photo'})
    },
    close () {
      history.back(-1)
    }
  },
  components: {
    BackUp
  },
  created () {
    if (this.$route.query.data) {
      console.log(this.$route.query.data)
      let data = this.$route.query.data// 获取二维码信息
      // 将此信息解析为json
      if (isJSON(data)) {
        this.info = JSON.parse(data)
      } else {
        console.log('json格式不正确')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.monitorInfo{
  background:rgba(102, 102, 102, 1);
  width:100%;
  height:100%;
  position: relative;
  .alertContnet{
    position: absolute;
    bottom:1.4rem;
    background:#fff;
    left:50%;
    transform: translateX(-50%);
    width:5.3rem;
    height: 8rem;
    padding:0.6rem 0.52rem 0.4rem;
    .closeBtn{
      position: absolute;
      right: 0;
      top:0;
      width:.56rem;
      height: .56rem;
      text-align: center;
      line-height: .56rem;
    }
    .img{
      width:4.20rem;
      height:5.54rem;
      background:#f00;
    }
    .text{
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      font-size:.24rem;
    }
    .mint-button{
      width:100%;
      height:.56rem;
    }
  }
}

</style>
