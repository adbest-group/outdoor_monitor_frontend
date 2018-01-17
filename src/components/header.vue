<template>
  <div class="header clearfix">
    <div class="companyInfo">{{this.realName}}{{this.company}}</div><span v-if="userType === '1'" class="awardInfo">{{奖品}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      realName: '',
      company: '',
      userType: ''
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
    height: 0.64rem;
    line-height: 0.64rem;
    padding:0 0.2rem;
    background:#000;
    .companyInfo{
      color:#fff;
      float:left
    }
    .awardInfo{
      color:#fff;
      float:right;
    }
  }
</style>
