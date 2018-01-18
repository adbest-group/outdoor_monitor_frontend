<template>
  <div class="photoCheck">
    <div class="imgComtent clearfix">
      <div class="imgWrapper">
        <img :src="imgArr[0]" class="img" id="img1"/>
      </div>
      <div class="imgWrapper" style="margin-left:0.2rem">
        <img :src="imgArr[1]" class="img" id="img2"/>
      </div>
      <div class="imgWrapper" style="margin-top:0.2rem">
        <img :src="imgArr[2]" class="img" id="img3"/>
      </div>
      <div class="imgWrapper" style="margin-left:0.2rem;margin-top:0.2rem">
        <img :src="imgArr[3]" class="img" id="img4"/>
      </div>
    </div>
    <div class="qrcodeInfo">
      <mt-cell title="内容1" is-link></mt-cell>
      <mt-cell title="内容2" is-link></mt-cell>
      <mt-cell title="内容3" is-link></mt-cell>
      <mt-cell v-if="status === '3'" title="等待审核" is-link></mt-cell>
      <mt-cell v-if="status === '4'" title="审核通过" is-link></mt-cell>
      <mt-cell v-if="status === '5'" title="审核未通过，驳回理由：照片不清晰" is-link></mt-cell>
    </div>
    <div v-if="status !== '5'">
      <mt-button type="primary" @click.native="handleClick">返回</mt-button>
    </div>
    <div class="btns clearfix" v-else>
      <mt-button style="margin-left:0.1rem;" type="primary" @click.native="handleClick">返回</mt-button>
      <div class="qr-btn" node-type="qr-btn">重新监测
          <input node-type="jsbridge" type="file" name="myPhoto" value="扫描二维码"  accept="image/*" capture="camera"/>
      </div>
    </div>

  </div>

</template>
<script>
// import { MessageBox } from 'mint-ui'
import { initBtn } from '../config/qrcodeRequire'
export default {
  data () {
    return {
      imgArr: [], // 存放四张图片
      status: '3'// 审核状态，包含审核中3、未审核通过5、已审核通过4三种状态
    }
  },
  methods: {
    upload (c, d) {
      let _this = this
      let $c = document.querySelector(c)
      let $d = document.querySelector(d)
      let file = $c.files[0]
      let length = c.length - 1
      let index = c.substr(length, 1)
      // 同时放入本地临时数组中
      _this.imgArr[index] = file
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        $d.setAttribute('src', e.target.result)
        let str = (d + 'Dis').substr(1)
        _this[str] = true
      }
    },
    imgClick (val) {
      let input = document.querySelector('#fileBtn' + val)
      input.click()
    },
    handleClick () {
      history.back()
    }
  },
  created () {
    // console.log(this.$route.query)
    if (this.$route.query.status) {
      this.status = this.$route.query.status
    }
    this.$store.commit('setCurrentType', '1')// 主线
  },
  mounted () {
    initBtn()
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
