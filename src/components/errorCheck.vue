<template>
  <div class="errorCheck">
    <div class="currentCondition">当前状态：<span v-if="status === 1">等待处理</span><span v-if="status === 2 || status === 3">处理完成</span></div>
    <div class="imgComtent clearfix" v-if="currentTask">
      <div class="imgWrapper">
        <img :src="currentTask.img_url_list[0]" @click="previewImg($event)" class="img" id="img1"/>
      </div>
    </div>
    <div class="qrcodeInfo" v-if="currentTask">
      <mt-cell :title="currentTask.ad_activity_name"></mt-cell>
      <mt-cell :title="currentTask.monitor_time"></mt-cell>
      <mt-cell :title="currentTask.ad_location"></mt-cell>
      <mt-cell :title="getReason(currentTask)"></mt-cell>
    </div>
     <!-- v-if="status === 1" -->
    <div>
      <mt-button type="primary" @click.native="handleClick">返回</mt-button>
    </div>
    <!-- <div class="btns clearfix" v-else>
      <mt-button style="margin-left:0.1rem;" type="primary" @click.native="handleClick">返回</mt-button>
        <div class="qr-btn" @click="uploadWrap()">重新监测
            <input ref="firstInput" node-type="jsbridge" type="file" @change="imgPhoto()" value="扫描二维码" accept="image/*" capture="camera" />
        </div>
    </div> -->
    <preview-img v-if="currentImgUrl" :img="currentImgUrl" @closePreview="closePreview"></preview-img>
    <!-- <wrapper :if-display="ifDisplay"></wrapper> -->
  </div>
</template>
<script>
// import { MessageBox } from 'mint-ui'
import checkMixin from '../mixins/checkMixin'
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
  mixins: [checkMixin],
  methods: {
    getReason (task) {
      if (task.problem || task.problem_other) {
        let a = task.problem ? task.problem : ''
        let b = task.problem_other ? task.problem_other : ''
        return '问题反馈：' + a + b
      } else {
        return '问题反馈'
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
    // console.log(this.$route.query)
    if (this.$route.query.status) {
      console.log(this.$route.query.status)
      this.status = parseInt(this.$route.query.status)
    }
    // this.$store.commit('setCurrentType', '2')// 纠错
    sessionStorage.setItem('currentType', '2')
  },
  created () {
    // console.log(this.$route.query)
    if (this.$route.query.status) {
      console.log(this.$route.query.status)
      this.status = parseInt(this.$route.query.status)
    }
    // this.$store.commit('setCurrentType', '2')// 纠错
    sessionStorage.setItem('currentType', '2')
  }
}
</script>
<style lang="scss">
input[node-type=jsbridge]{
    display:none;
}
  .errorCheck{
    padding:0.5rem .7rem 0;
    .currentCondition{
      font-size:.26rem;
      text-align: center
    }
    .imgComtent{
      margin-top:.3rem;
      .imgWrapper{
        text-align: center;
        .input{
          display: none;
        }
        .img{
          width:4.4rem;
          height:4.4rem;
          display: inline-block;
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
