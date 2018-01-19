<template>
  <div class="login">
    <div class="login-inner">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="form.username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password"></mt-field>
      <mt-field label="验证码" v-model="form.captcha">
        <img class="capImg" src="">
      </mt-field>
    </div>
    <mt-button @click.native="login" type="primary">登陆</mt-button>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import GLOBAL from '../config/global'
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        captcha: ''
      },
      vcode_img: '',
      imei: '',
      idfa: '',
      token: ''
    }
  },
  methods: {
    login () {
      let currentUser = {
        userId: '123',
        userType: '1',
        realName: 'test1',
        company: '公司姓名'
      }
      if (this.form.username === 'test') {
        this.$store.commit('setCurrentUser', currentUser)
      } else {
        currentUser.userType = '0'
        this.$store.commit('setCurrentUser', currentUser)
      }
      this.$store.commit('setCurrentUser', currentUser)
      // this.$router.push({path: '/index'})
      let status = '0'
      if (this.form.username === '' || this.form.password === '' || this.form.captcha === '') {
        MessageBox.alert('请输入登录信息', '登录提示')
      } else {
        if (status === '0') {
          this.$router.push({path: '/index'})// 跳转首页
        } else if (status === '1') {
          MessageBox.alert('用户名或密码错误', '登录提示')
        } else if (status === '2') {
          MessageBox.alert('验证码错误', '登录提示')
        } else {
          MessageBox.alert('服务器错误', '登录提示')
        }
      }
    },
    loginMethod () {
      this.axios({
        url: GLOBAL.URL.Login,
        method: 'post',
        data: {// 登陆假数据
          'imei': this.imei,
          'idfa': this.idfa,
          'token': this.token,
          'username': this.form.username,
          'password': this.form.password,
          'vcode': this.form.captcha
        }
      }).then((r) => {
        console.log('登陆成功', r)
        //         {
        //  "common": {
        //   "status": "1",  //0：登陆成功 1：用户名或密码错误 2：验证码错误
        //   "msg": "用户名或密码错误"
        //  },
        //  "realname": "张三",
        //  "company": "浙江百泰",
        //  "user_id":"123",
        //  "usertype": "1"
        // }
        if (this.form.username === '' || this.form.password === '' || this.form.captcha === '') {
          MessageBox.alert('请输入登录信息', '登录提示')
        } else {
          let status = r.data.common.status
          if (status === '0') {
            let currentUser = {
              userId: r.data.user_id,
              userType: r.data.usertype,
              realname: r.data.realname,
              company: r.data.company
            }
            this.$store.commit('setCurrentUser', currentUser)
            this.$router.push({path: '/index'})// 跳转首页
          } else if (status === '1') {
            MessageBox.alert('用户名或密码错误', '登录提示')
          } else if (status === '2') {
            MessageBox.alert('验证码错误', '登录提示')
          } else {
            MessageBox.alert('服务器错误', '登录提示')
          }
        }
      })
    },
    getToken () { // 获取token、验证码
      this.axios({
        url: GLOBAL.URL.GET_TOKEN,
        method: 'get'
      }).then((r) => {
        // {
        //  "vcode_img_url": "http://xxx/vcode.png"
        // }
        console.log('验证码和token信息', r)
        this.vcode_img = r.data.vcode_img_url
        this.token = r.data.token
        this.$store.commit('setToken', this.token)// 并将token放入store中
      })
    }
  },
  created () {
    // let imei = 123456
    // this.getVerify(imei)
  }
}
</script>

<style lang="scss" scoped>
.login{
  padding:0 0.6rem;
  position:relative;
  .login-inner{
    padding-top:3rem;
    .capImg{
      width:1rem;
      height:.45rem;
    }
    .mint-cell{
    }
  }
  .mint-button{
    margin-top:.7rem;
    width:100%;
  }
}
</style>
