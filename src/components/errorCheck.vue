<template>
  <div class="errorCheck">
    <div class="currentCondition">当前状态：<span>等待处理</span></div>
    <div class="imgComtent clearfix">
      <div class="imgWrapper">
        <img :src="imgArr[0]" class="img" id="img1"/>
      </div>
    </div>
    <div class="qrcodeInfo">
      <mt-cell title="内容1" is-link></mt-cell>
      <mt-cell title="内容2" is-link></mt-cell>
      <mt-cell title="内容3" is-link></mt-cell>
      <mt-cell title="等待审核" is-link></mt-cell>
    </div>
    <div v-if="status">
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
import checkMixin from '../mixins/checkMixin'
export default {
  mixins: [checkMixin],
  created () {
    // console.log(this.$route.query)
  }
}
</script>
<style lang="scss">
input[node-type=jsbridge]{
    display:none;
}
  .errorCheck{
    padding:1rem .7rem 0;
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
