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
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        captcha: ''
      }
    }
  },
  methods: {
    login () {
      this.$router.push({path: '/index'})
    }
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
