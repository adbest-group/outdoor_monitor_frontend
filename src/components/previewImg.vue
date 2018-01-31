<template>
  <div class="previewImg" @click="closePreview">
    <img class="img" :src="img" alt="">
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    }
  },
  methods: {
    closePreview () {
      this.$emit('closePreview')
    }
  }
}
</script>

<style lang="scss" scoped>
  .previewImg {
    position: fixed;
    background:#000;
    top:0;
    left:0;
    bottom:0;
    right:0;
    animation:move 0.5s;
    -webkit-animation:move 0.5s; /*Safari and Chrome*/
    img{
      width:100%;
      position: absolute;
      top:50%;
      transform: translateY(-50%);
    }
    @keyframes move{
      from {opacity: 0;}
      to {opacity: 1;}
    }
  }
</style>
