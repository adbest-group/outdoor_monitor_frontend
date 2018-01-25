<template>
  <div class="header clearfix">
    <div class="companyInfo"><i class="icon iconfont icon-gongsixinxi"></i><p class="realName">{{this.realName}}</p><p class="company">{{this.company}}</p></div><span v-if="userType === '1'" class="awardInfo"><i class="iconfont icon-jiangpin" @click="toLink"></i></span>
  </div>
</template>

<script>
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
    }
  },
  created () {
    this.realName = this.$store.getters.getCurrentUser.realName
    this.company = this.$store.getters.getCurrentUser.company
    this.userType = this.$store.getters.getCurrentUser.userType
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
  }
</style>
