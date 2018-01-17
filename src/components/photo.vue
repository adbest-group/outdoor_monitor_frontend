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
      <div class="imgWrapper" style="margin-left:0.2rem">
        <div class="imgNone" :class="{ hide: img2Dis }" @click="imgClick(2)">
          <div class="imgNoneContent">
            <p>近 景</p>
            <p>+</p>
          </div>
        </div>
        <input class="input" id="fileBtn2" type="file" @change="upload('#fileBtn2', '#img2');" accept="image/*" capture="camera"/>
        <img @click="imgClick(2)" src="" class="img" id="img2"/>
      </div>
      <div class="imgWrapper" style="margin-top:0.2rem">
        <div class="imgNone" :class="{ hide: img3Dis }" @click="imgClick(3)">
          <div class="imgNoneContent">
            <p>夜 景</p>
            <p>+</p>
          </div>
        </div>
        <input class="input" id="fileBtn3" type="file" @change="upload('#fileBtn3', '#img3');" accept="image/*" capture="camera"/>
        <img  @click="imgClick(3)" src="" class="img" id="img3"/>
      </div>
      <div class="imgWrapper" style="margin-left:0.2rem;margin-top:0.2rem">
        <div class="imgNone" :class="{ hide: img4Dis }" @click="imgClick(4)">
          <div class="imgNoneContent">
            <p>编 号</p>
            <p>+</p>
          </div>
        </div>
        <input class="input" id="fileBtn4" type="file" @change="upload('#fileBtn4', '#img4');" accept="image/*" capture="camera"/>
        <img @click="imgClick(4)" src="" class="img" id="img4"/>
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
import GLOBAL from '../config/global'
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
    taskSubmit () { // 任务提交方法
      this.axios({
        url: GLOBAL.URL.TASK_SUBMIT,
        method: 'post',
        data: {
          'type': '1', // 1：监测任务 2：纠错任务
          'user_id': '123',
          'task_id': '123', // 如果为纠错任务该字段为空
          'longitude': '120.123',
          'latitude': '32.123',
          'feedback': {
            'problem': ['内容不正确', '结构有问题', '编号不存在', '灯光不亮'],
            'other': '其他问题'
          }
        }
      }).then((r) => {
        if (r.status === '0') {
          console.log('提交成功', r)
          this.$router.push({path: '/index'})// 跳转首页
        } else {
          console.log('提交失败', r)
        }
      })
    },
    handleClick () { // 任务提交动作
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
      margin-top:.6rem;
    }
  }
</style>
