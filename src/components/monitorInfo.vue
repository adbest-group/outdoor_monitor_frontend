<template>
  <div class="monitorInfo">
    <back-up></back-up>
    <div class="alertContnet">
      <span class="closeBtn" @click="close">X</span>
      <div class="img">
        <template v-if="qrcode">
          <img :src="qrcode.pic_url" alt="">
        </template>
      </div>
      <p class="text">该位置正确上刊画面</p>
      <mt-button type="primary" @click.native="handleClick">确定</mt-button>
    </div>
  </div>
</template>
<script>
import BackUp from './backUp.vue'
import { MessageBox } from 'mint-ui'
import { isJSON } from '../config/utils'
export default {
  data () {
    return {
      qrcode: null// 二维码中的json格式的信息
    }
  },
  methods: {
    handleClick () {
      let type = this.$store.getters.getCurrentType
      if (type === '1') { // 主线任务
        this.$router.push({path: '/photo'})
      } else if (type === '2') { // 纠错任务
        this.$router.push({path: '/errorPhoto'})
      }
    },
    close () {
      history.back(-1)
    }
  },
  components: {
    BackUp
  },
  created () {
    if (localStorage.getItem('qrcode')) {
      let data = localStorage.getItem('qrcode')
      console.log(data)
      // 将此信息解析为json
      if (isJSON(data)) {
        this.qrcode = JSON.parse(data)
      } else {
        console.log('保存的二维码信息不是json格式或二维码未扫描成功')
        MessageBox({
          title: '二维码扫描失败',
          message: '请尝试重新扫描二维码',
          confirmButtonText: '确定'
        }).then((val) => {
          history.go(-1)
        })
      }
    } else {
      console.log('二维码信息未保存到本地存储里')
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
    top:50%;
    background:#fff;
    left:50%;
    transform: translate(-50%,-50%);
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
      img{
        width:100%;
        height:100%;
      }
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
