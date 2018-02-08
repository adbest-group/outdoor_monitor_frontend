<template>
  <div class="errorSelectTask">
    <task-list :task-list="ad_activity_seats"></task-list>
  </div>
</template>

<script>
import TaskList from '../components/taskList.vue'
export default {
  data () {
    return {
      ad_activity_seats: []
    }
  },
  components: {
    TaskList
  },
  created () {
    this.ad_activity_seats = JSON.parse(sessionStorage.getItem('qrcode')).ad_activity_seats
  }
}
</script>
