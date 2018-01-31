<template>
  <div class="errorPhoto">
    <div class="div" v-show="!questionDetail">
      <div class="imgComtent clearfix">
        <div class="imgWrapper">
          <div class="imgNone" :class="{ hide: img1Dis }" @click="imgClick(1)">
            <div class="imgNoneContent">
              <p>纠 错</p>
              <p>+</p>
            </div>
          </div>
          <input class="input" id="fileBtn1" type="file" @change="upload('#fileBtn1', '#img1');" accept="image/*" capture="camera"/>
          <img @click="imgClick(1)" src="" class="img" id="img1"/>
        </div>
      </div>
      <div class="qrcodeInfo" v-if="qrcode">
        <mt-cell :title="qrcode.activity_name" is-link></mt-cell>
        <mt-cell :title="currentTime" is-link></mt-cell>
        <mt-cell :title="qrcode.ad_seat_name" is-link></mt-cell>
      </div>
      <mt-button type="primary" :class="{greyBackground:isCommit}" @click.native="handleClick">{{confirm}}</mt-button>
    </div>
    <div class="questionDetail1" v-show="questionDetail">
      <p class="title">问题详情</p>
      <mt-checklist
        align="right"
        v-model="value"
        :options="['内容不正确', '结构有问题', '编号不存在','灯光不亮']">
      </mt-checklist>
      <mt-field class="mint-define" placeholder="其他问题" type="textarea" rows="4" v-model="otherQuestion"></mt-field>
      <mt-button type="primary" :class="{greyBackground:isCommit}" @click.native="handleClickWithQues">{{submit}}</mt-button>
    </div>
  </div>
</template>
<script>
import { ifQrcode, compress } from '../config/utils'
import { MessageBox } from 'mint-ui'
import GLOBAL from '../config/global'
// import checkMixin from '../mixins/checkMixin'
import moment from 'moment'
export default {
  data () {
    return {
      img1Dis: false,
      img2Dis: false,
      img3Dis: false,
      img4Dis: false,
      imgArr: [], // 存放四张图片,
      qrcode: null,
      questionDetail: false,
      value: [],
      otherQuestion: '',
      isCommit: false,
      confirm: '确定',
      submit: '提交'
    }
  },
  // mixins: [checkMixin],
  methods: {
    upload (c, d) {
      let _this = this
      let $c = document.querySelector(c)
      let $d = document.querySelector(d)
      let file = $c.files[0]
      let length = c.length - 1
      let index = c.substr(length, 1)
      // 同时放入本地临时数组中
      _this.imgArr[index - 1] = file
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
    checkImg () {
      if (this.imgArr.length !== 1) {
        // 提交前看一下图片是否是1张
        console.log(this.imgArr)
        MessageBox({
          title: '照片不全',
          message: '必须拍1张照片！',
          confirmButtonText: '确定'
        }).then((val) => {
          return false
        })
        return false
      } else {
        return true
      }
    },
    taskSubmit () { // 任务提交方法
      console.log('length', this.imgArr)
      let formData = new FormData()
      let docs = []// 存放一张照片
      for (let i = 1; i < 2; i++) {
        let doc = document.querySelector('#fileBtn' + i)
        docs.push(doc)
      }
      formData.append('type', '2')// 1 代表监测任务 2 代表纠错任务
      formData.append('ad_activity_seat_id', this.qrcode.ad_activity_seat_id)
      formData.append('lon', '')
      formData.append('lat', '')
      formData.append('problem', this.value.join(','))
      formData.append('other', this.otherQuestion)
      if (this.isCommit) { // 是否已经点击提交
        return false
      }
      this.isCommit = true
      this.submit = '正在提交，请稍后...'
      this.confirm = '正在提交，请稍后...'
      return new Promise((resolve, reject) => {
        compress(docs, 0.01).then(datas => {
          for (let i = 1; i < 5; i++) {
            formData.append('pic' + i, datas[i - 1])
          }
          this.axios({
            url: GLOBAL.URL.TASK_SUBMIT,
            method: 'post',
            contentType: 'multipart/form-data',
            data: formData
          }).then((r) => {
            console.log('提交任务后返回的:', r)
            resolve(r.ret)
          }).catch((r) => {
            console.log(r)
            reject(r)
          })
        })
      })
    },
    handleClickWithQues () { // 带问题提交任务
      this.taskSubmit().then(data => {
        if (data.code === 100) {
          MessageBox({
            title: '提交完成',
            message: '待审核通过后发放奖励',
            confirmButtonText: '确定'
          }).then((val) => {
            this.$router.push({path: '/index'})// 提交带问题的任务完成,跳转到首页
          })
        } else {
          alert('提交失败')
        }
      })
    },
    handleClick () { // 任务提交动作（不带问题的）
      if (!this.checkImg()) {
        return false
      }
      this.questionDetail = true
    }
  },
  computed: {
    currentTime () {
      return moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    ifQrcode(this)
    console.log(this.qrcode)
  }
}
</script>
<style lang="scss">
  .errorPhoto{
    .greyBackground{
      background:#ccc;
    }
    .div{
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
    .questionDetail1{
      position: fixed;
      left: 0;
      right: 0;
      top:0;
      bottom:0;
      z-index:10;
      padding:1rem 0.6rem 0;
      .mint-define{
        padding:0 0!important;
        margin-top:.4rem;
      }
      .title{
        font-weight:600;
        font-size:.4rem;
        text-align: center;
        line-height:1.12rem;
        height:1.12rem;
      }
      .ul{
        .li{
          height: 0.6rem;
          line-height: 0.6rem;
          border-bottom:1px solid #333;
        }
      }
      .mint-button{
        width:100%;
        height:.56rem;
        margin-top:.92rem;
      }
    }

  }
</style>
