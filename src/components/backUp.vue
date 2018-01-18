<template>
  <div class="backUp">
    <mt-header>
      <div slot="left" >
        <mt-button icon="back" @click.native="goBack">返回</mt-button>
      </div>
    </mt-header>
  </div>
</template>

<script>
import { Header, Button } from 'mint-ui'
export default {
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      history.back()
    }
  },
  components: {
    Header,
    Button
  }
}
</script>
<style lang="scss" scoped>

</style>
