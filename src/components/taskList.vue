<template>
  <div class="taskList">
    <ul>
      <li v-for="item in taskList" :key="item.index">
        <div class="radioClass">
          <input type="radio" :id="item.ad_activity_seat_id" name="name" @click="getTask(item)">
          <label :for="item.ad_activity_seat_id">
            <span>{{item.activity_name}}</span>
          </label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    getTask (item) {
      sessionStorage.setItem('currentTask', JSON.stringify(item))
      this.$router.push('/monitorInfo')
    }
  },
  props: {
    taskList: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
  $height: 0.96rem;
  .taskList{
    ul{
      li{
        height:$height;
        line-height:$height;
        border-bottom:1px solid #ddd;
        padding-left:0.1rem;
        .radioClass{
          padding-right:0.5rem;
        }
      }
    }
  }
</style>
