<template>
  <div class="header clearfix">
    <div class="companyInfo">
      <i class="icon iconfont icon-gongsixinxi"></i>
      <p class="realName">{{this.realName}}</p>
      <p class="company">{{this.company}}</p>
    </div>
    <span @click="logout" class="quit">退出</span>
    <span v-if="userType === '1'" class="awardInfo">
      <i class="iconfont icon-jiangpin" @click="toLink"></i>
    </span>
  </div>
</template>

<script>
import GLOBAL from '../config/global'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      realName: '',
      company: '',
      userType: '1'
    }
  },
  methods: {
    toLink () {
      this.$router.push('/reward')
    },
    logout () {
      MessageBox({
        title: '确认',
        message: '确认退出登陆么?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then((val, action) => {
        if (val === 'confirm') { // 确定退出
          this.quit()
        } else { // 取消
          console.log('取消')
        }
      })
    },
    getInfo () {
      let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
      this.realName = currentUser.realName
      this.company = currentUser.company
      this.userType = currentUser.userType
    },
    quit () {
      this.axios({
        url: GLOBAL.URL.LOGOUT,
        method: 'post'
      }).then((r) => {
        console.log('登出信息', r)
        sessionStorage.clear()
        this.$router.push('/login')
      })
    }
  },
  activated () {
    this.getInfo()
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="scss">
  .header{
    height: 0.8rem;
    line-height: 0.8rem;
    padding:0.08rem 0.2rem;
    background:#000;
    overflow: hidden;
    .companyInfo{
      padding-left:.5rem;
      width:3rem;
      color:#fff;
      float:left;
      position: relative;
      .icon{
        position: absolute;
        top:0;
        left:0;
      }
      .realName{
        height: 0.32rem;
        line-height: 0.32rem;
      }
      .company{
        height: 0.32rem;
        line-height: 0.32rem;
      }
    }
    .awardInfo{
      color:#fff;
      float:right;

    }
    .quit{
      float:right;
      color:#fff;
      margin-left:0.2rem;
    }
  }
</style>
