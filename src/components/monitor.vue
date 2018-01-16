<template>
  <div class="monitor">
    <p class="text"><span>--广告活动画面--</span></p>
    <div class="img">

    </div>
    <p class="text"><span>--广告名称--</span></p>
    <p class="content"><span>KFC  CNY闻鸡起舞堡</span></p>

    <p class="text textTwo"><span>--需监测广告位--</span></p>
    <p class="content"><span>人民广场候车亭-1</span></p>
    <div>
        <div class="qr-btn" node-type="qr-btn">监测
            <input node-type="jsbridge" type="file" name="myPhoto" value="扫描二维码" />
        </div>
    </div>
  </div>
</template>
<script>
import '../config/qrcodeRequire'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    handleClick () {
      // this.$router.push({path: '/monitorInfo'})
    }
  }
}
</script>
<style lang="scss" scoped>
input[node-type=jsbridge]{
    display:none;
}
.monitor{
  text-align: center;
  padding:0 .64rem;
  padding-top:0.3rem;
  .text,.content{
    text-align: center;
    height: 0.6rem;
    line-height:0.6rem;
  }
  .text{
    color:#999;
  }
  .textTwo{
    margin-top:.6rem;
  }
  .mint-button{
    width:100%;
    height:.56rem;
  }
  .qr-btn{
    margin-top:0.6rem;
    width:100%;
    height:.56rem;
    color:#fff;
    background:#26a2ff;
    display: inline-block;
    border-radius:0.08rem;
    font-size:0.36rem;
  }
  .img{
    display: inline-block;
    width:4.50rem;
    height:4.92rem;
    background:#f00;
  }
}
</style>
