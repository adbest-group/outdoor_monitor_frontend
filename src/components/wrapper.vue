<template>
  <div class="wrapper" :class="{'hideAll':ifDisplay}">
    <mt-spinner color="#26a2ff" :type="3" :size="100"></mt-spinner>
  </div>
</template>

<script>
export default {
  props: {
    ifDisplay: {
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hideAll{
    display: none
  }
</style>
