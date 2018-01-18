<template>
  <div class="photo">
    <div class="imgComtent clearfix">
      <div class="imgWrapper">
        <div class="imgNone" :class="{ hide: img1Dis }" @click="imgClick(1)">
          <div class="imgNoneContent">
            <p>远 景</p>
            <p>+</p>
          </div>
        </div>
        <input class="input" id="fileBtn1" type="file" @change="upload('#fileBtn1', '#img1');" accept="image/*" capture="camera"/>
        <img @click="imgClick(1)" src="" class="img" id="img1"/>
      </div>
    </div>
    <div class="qrcodeInfo">
      <mt-cell title="内容1" is-link></mt-cell>
      <mt-cell title="内容2" is-link></mt-cell>
      <mt-cell title="内容3" is-link></mt-cell>
    </div>
    <mt-button type="primary" @click.native="handleClick">确定</mt-button>
  </div>

</template>
<script>
import { MessageBox } from 'mint-ui'
import checkMixin from '../mixins/checkMixin'
export default {
  data () {
    return {
      img1Dis: false,
      img2Dis: false,
      img3Dis: false,
      img4Dis: false,
      imgArr: []// 存放四张图片
    }
  },
  mixins: [checkMixin],
  methods: {
    handleClick () {
      MessageBox({
        title: '问题反馈',
        message: '您监测的广告牌是否有问题?',
        showCancelButton: true,
        confirmButtonText: '否',
        cancelButtonText: '是'
      }).then((val, action) => {
        if (val === 'confirm') { // 否
          MessageBox({
            title: '提交完成',
            message: '待审核通过后发放奖励',
            confirmButtonText: '确定'
          }).then((val) => {
            this.$router.push({path: '/index'})
          })
        } else { // 是
          this.$router.push({path: '/questionDetail'})
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .photo{
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
          width:5.12rem;
          height:5.12rem;
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
      margin-top:.6rem;
    }
  }
</style>
