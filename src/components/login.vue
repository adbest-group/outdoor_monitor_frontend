<template>
  <div class="login">
    <div class="login-inner">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="form.username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password"></mt-field>
      <mt-field label="验证码" v-model="form.captcha">
        <img class="capImg" src="">
      </mt-field>
      <mt-button @click.native="login" type="primary">登陆</mt-button>
    </div>
  </div>
</template>
<script>
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
      imei: ''
    }
  },
  methods: {
    login () {
      this.$router.push({path: '/index'})
    },
    loginMethod () {
      this.axios({
        url: GLOBAL.URL.Login,
        method: 'post',
        data: {
          'imei': this.imei,
          'user_id': this.form.username,
          'password': this.form.password,
          'vcode': this.form.captcha
        }
      }).then((r) => {
        console.log('登陆成功', r)
        this.$router.push({path: '/index'})// 跳转首页
      })
    },
    getVerify (imei) { // 获取验证码
      this.axios({
        url: GLOBAL.URL.GET_VCODE,
        method: 'post',
        data: {
          imei: imei// 暂时写死
        }
      }).then((r) => {
        // {
        //  "vcode_img_url": "http://xxx/vcode.png"
        // }
        console.log('验证码', r)
        this.vcode_img = r.vcode_img_url
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
    .mint-button{
      margin-top:.7rem;
      width:100%;
    }
  }

}
</style>
