<template>
  <div class="backUp">
    <p><span @click="goBack()">返回</span></p>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      history.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.backUp{
  color:#fff;
  height:.92rem;
  line-height:.92rem;
  padding:0 .52rem;
}
</style>
