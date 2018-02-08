<template>
  <div class="login">
    <div class="login-inner">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="form.username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password"></mt-field>
      <mt-field label="验证码" v-model="form.captcha">
        <img class="capImg" @click="changeImage" :src="imgSrc">
      </mt-field>
    </div>
    <mt-button @click.native="login" type="primary">登陆</mt-button>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import GLOBAL from '../config/global'
// monitor@adbest.com
// customer@adbest.com
export default {
  data () {
    return {
      form: {
        username: 'monitor@adbest.com',
        password: '123456',
        captcha: ''
      },
      vcode_img: '',
      imei: '',
      idfa: '',
      token: '',
      imgSrc: ''
    }
  },
  methods: {
    login () {
      if (this.form.username === '' || this.form.password === '' || this.form.captcha === '') {
        MessageBox.alert('请输入登录信息', '登录提示')
      } else {
        this.loginMethod()
      }
    },
    loginMethod () {
      this.axios({
        url: GLOBAL.URL.LOGIN,
        method: 'post',
        // contentType: 'application/x-www-form-urlencoded',
        data: {
          'username': this.form.username,
          'password': this.form.password,
          'vcode': this.form.captcha
        }
      }).then((r) => {
        console.log('登陆成功', r)
        let code = r.ret.code
        let message = r.ret.resultDes
        let data = r.ret.result
        if (code === 100) {
          let currentUser = {}
          currentUser.userId = data.userId
          currentUser.userType = data.usertype.toString()
          // currentUser.userType = '3'
          currentUser.company = data.company
          currentUser.realName = data.realname
          // this.$store.commit('setCurrentUser', currentUser)
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
          this.$router.push({path: '/index'})// 跳转首页
        } else if (code === 101) {
          MessageBox.alert(message)
        } else {
          MessageBox.alert('服务器错误', '登录提示')
        }
      })
    },
    // getToken () { // 获取token、验证码
    //   this.axios({
    //     url: GLOBAL.URL.GET_TOKEN,
    //     method: 'get'
    //   }).then((r) => {
    //     this.vcode_img = r.data.vcode_img_url
    //     this.token = r.data.token
    //     this.$store.commit('setToken', this.token)// 并将token放入store中
    //   })
    // },
    changeImage () {
      let t = new Date()
      this.imgSrc = '/api/getCode?' + t
    }
  },
  created () {
    let t = new Date()
    this.imgSrc = '/api/getCode?' + t
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
  }
  .mint-button{
    margin-top:.7rem;
    width:100%;
  }
}
</style>
