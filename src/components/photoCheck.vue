<template>
  <div class="photoCheck">
    <div class="imgComtent clearfix" v-if="currentTask">
      <div class="imgWrapper">
        <img :src="currentTask.img_url_list[0]" @click="previewImg($event)" class="img" id="img1"/>
      </div>
      <div class="imgWrapper" style="margin-left:0.2rem">
        <img :src="currentTask.img_url_list[1]" @click="previewImg($event)" class="img" id="img2"/>
      </div>
      <div class="imgWrapper" style="margin-top:0.2rem">
        <img :src="currentTask.img_url_list[2]" @click="previewImg($event)" class="img" id="img3"/>
      </div>
      <div class="imgWrapper" style="margin-left:0.2rem;margin-top:0.2rem">
        <img :src="currentTask.img_url_list[3]" @click="previewImg($event)" class="img" id="img4"/>
      </div>
    </div>
    <div class="qrcodeInfo" v-if="currentTask">
      <mt-cell :title="currentTask.ad_activity_name"></mt-cell>
      <mt-cell :title="currentTask.monitor_time"></mt-cell>
      <mt-cell :title="currentTask.ad_location"></mt-cell>
      <mt-cell v-if="status === 3" title="等待审核"></mt-cell>
      <mt-cell v-if="status === 4" title="审核通过"></mt-cell>
      <mt-cell v-if="status === 5" :title="getReason(currentTask)"></mt-cell>
    </div>
    <div v-if="status !== 5">
      <mt-button type="primary" @click.native="handleClick">返回</mt-button>
    </div>
    <div class="btns clearfix" v-else>
      <mt-button style="margin-left:0.1rem;" type="primary" @click.native="handleClick">返回</mt-button>
        <div class="qr-btn" @click="uploadWrap()">重新监测
            <input ref="firstInput" node-type="jsbridge" type="file" @change="imgPhoto()" value="扫描二维码" accept="image/*" capture="camera" />
        </div>
    </div>
    <preview-img v-if="currentImgUrl" :img="currentImgUrl" @closePreview="closePreview"></preview-img>
    <wrapper :if-display="ifDisplay"></wrapper>
  </div>
</template>
<script>
// import { MessageBox } from 'mint-ui'

import checkMixin from '../mixins/checkMixin'
import qrcodeMixin from '../mixins/qrcodeMixin'
import PreviewImg from '../components/previewImg'
export default {
  data () {
    return {
      currentImgUrl: ''
    }
  },
  components: {
    PreviewImg
  },
  mixins: [checkMixin, qrcodeMixin],
  methods: {
    getReason (task) {
      if (task.reason) {
        return '审核未通过：' + task.reason
      } else {
        return '审核未通过'
      }
    },
    closePreview () {
      this.currentImgUrl = ''
    },
    previewImg (event) {
      let id = event.target.id
      let index = Number.parseInt(id.substr(id.length - 1))
      this.currentImgUrl = this.currentTask.img_url_list[index - 1]
    }
  },
  activated () {
    if (this.$route.query.status) {
      this.status = parseInt(this.$route.query.status)
    }
    // this.$store.commit('setCurrentType', '1')// 主线
    sessionStorage.setItem('currentType', '1')
  },
  created () {
    // console.log(this.$route.query)
    if (this.$route.query.status) {
      this.status = parseInt(this.$route.query.status)
    }
    // this.$store.commit('setCurrentType', '1')// 主线
    sessionStorage.setItem('currentType', '1')
  }
}
</script>
<style lang="scss">
input[node-type=jsbridge]{
    display:none;
}
  .photoCheck{
    padding:1rem .7rem 0;
    .imgComtent{
      .imgWrapper{
        float:left;
        position: relative;
        .imgNone{
          position: absolute;
          top:0;
          left: 0;
          right:0;
          bottom:0;
          background:#000;
          border-radius:0.26rem;
          color:#fff;
          font-weight: bolder;
          .imgNoneContent{
            width:1.32rem;
            height:1.6rem;
            position: absolute;
            left: 50%;
            top:50%;
            font-size:0.56rem;
            transform: translate(-50%,-50%);
            p{
              text-align: center;
            }
          }
        }
        .input{
          display: none;
        }
        .img{
          width:2.4rem;
          height:2.4rem;
          border-radius:0.26rem;
        }
      }
    }
    .qrcodeInfo{
      margin-top:0.2rem;
    }
    .mint-button{
      width:100%;
      height:.56rem;
    }
    .btns{
      margin-top:.6rem;
      .mint-button{
        float:left;
        width:40%;
        height:.56rem;
        line-height:.56rem;
      }
      .qr-btn{
        float:left;
        margin-left:0.6rem;
        text-align:center;
        font-size:0.3rem;
        width:40%;
        height:.56rem;
        line-height:.56rem;
        color:#fff;
        background:#26a2ff;
        border-radius:0.08rem;
        display: inline-block;
      }
    }
  }
</style>
