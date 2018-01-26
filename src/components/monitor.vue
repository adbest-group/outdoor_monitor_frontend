<template>
  <div class="monitor">
    <p class="text"><span>--广告活动画面--</span></p>
    <template v-if="currentTask">
      <div class="img">
        <img :src="currentTask.img_url_list[0]" alt="">
      </div>
      <p class="text"><span>--广告名称--</span></p>
      <p class="content"><span>{{currentTask.ad_name}}</span></p>

      <p class="text"><span>--监测时间 ({{currentTask.task_type_text}})--</span></p>
      <p class="content"><span>{{currentTask | filterTime}}</span></p>

      <p class="text textTwo"><span>--需监测广告位--</span></p>
      <p class="content"><span>{{currentTask.ad_location}}</span></p>
      <div>
          <div class="qr-btn" @click="uploadWrap()">监测
              <input ref="firstInput" node-type="jsbridge" type="file" @change="imgPhoto()" value="扫描二维码" accept="image/*" capture="camera" />
          </div>
      </div>
    </template>
  </div>
</template>
<script>
// import { initBtn } from '../config/qrcodeRequire'
import qrcodeMixin from '../mixins/qrcodeMixin'
export default {
  data () {
    return {
      value: ''
    }
  },
  mixins: [qrcodeMixin],
  filters: {
    filterTime (obj) {
      switch (obj.task_type) {
        case 1:
          return obj.monitor_start
        case 2:
          return obj.monitor_start + ' ～ ' + obj.monitor_end
        case 3:
          return obj.monitor_end
      }
    }
  },
  computed: {
    currentTask () {
      return JSON.parse(sessionStorage.getItem('currentTask'))
    }
  },
  methods: {

  },
  mounted () {
    // initBtn()
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
  .qr-btn{
    margin-top:0.2rem;
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
    img{
      width:100%;
      height:100%;
    }
  }
}
</style>
