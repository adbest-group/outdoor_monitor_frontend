<template>
  <div class="reward-wrapper">
    <back-up></back-up>
    <div class="my-reward">
      <h3 class="title">我的奖励</h3>
      <p class="now-reward">当前总共：<span class="prize">{{reward.total_reward}}元</span></p>
    </div>
    <reward-list :detailList="reward.detail"></reward-list>
  </div>
</template>
<script>
import BackUp from './backUp'
import RewardList from './rewardList'
import GLOBAL from '../config/global'
export default {
  data () {
    return {
      reward: {
        'total_reward': 40,
        'detail': [{
          'date': '2018/01/16',
          'time': '12:12',
          'reward': '20'
        }, {
          'date': '2018/01/16',
          'time': '12:12',
          'reward': '20'
        }, {
          'date': '2018/01/16',
          'time': '12:12',
          'reward': '20'
        }]
      },
      token: '',
      userId: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    getReward () { // 获取当前用户的奖品信息
      this.axios({
        url: GLOBAL.URL.GET_REWARD,
        method: 'post',
        data: {
          token: this.token,
          user_id: this.userId// 用户id
        }
      }).then((r) => {
        console.log(r) // 奖励信息
        this.reward = r.data
      })
    }
  },
  components: {
    BackUp,
    RewardList
  }
}
</script>

<style lang="scss" scoped>
  .my-reward{
    padding: .4rem 1rem;
    background-color: #eee;

    .title {
      font-size: .4rem;
      margin-bottom: .2rem;
    }

    .now-reward {
      font-size: .26rem;

      .prize {
        color: red;
      }
    }
  }
</style>
