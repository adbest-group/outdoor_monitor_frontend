// <template>
// <!-- 此页面暂时不使用 -->
//   <div class="questionDetail questionWrapper">
//     <p class="title">问题详情</p>
//     <mt-checklist
//       align="right"
//       v-model="value"
//       :options="['内容不正确', '结构有问题', '编号不存在','灯光不亮']">
//     </mt-checklist>
//     <mt-field class="mint-define" placeholder="其他问题" type="textarea" rows="4" v-model="otherQuestion"></mt-field>
//     <mt-button type="primary" :class="{greyBackground:isCommit}" @click.native="handleClick">提交</mt-button>
//   </div>
// </template>
<script>
// import { MessageBox } from 'mint-ui'
// export default {
//   data () {
//     return {
//       value: [],
//       otherQuestion: '',
//       isCommit: false
//     }
//   },
//   methods: {
//     handleClick () {
//       if (this.isCommit) {
//         return false
//       } else {
//         MessageBox({
//           title: '提交完成',
//           message: '待审核通过后发放奖励',
//           confirmButtonText: '确定'
//         }).then((val) => {
//           this.$router.push({path: '/index'})
//         })
//       }
//     }
//   }
// }
// </script>
// <style lang="scss">
//   .questionWrapper{
//     .mint-cell-wrapper{
//       padding:0!important;
//     }
//   }
// </style>

// <style lang="scss" scoped>
//   .questionDetail{
//     padding:1rem 0.6rem 0;
//     .mint-define{
//       padding:0 0!important;
//       margin-top:.4rem;
//     }
//     .title{
//       font-weight:600;
//       font-size:.4rem;
//       text-align: center;
//       line-height:1.12rem;
//       height:1.12rem;
//     }
//     .ul{
//       .li{
//         height: 0.6rem;
//         line-height: 0.6rem;
//         border-bottom:1px solid #333;
//       }
//     }
//     .mint-button{
//       width:100%;
//       height:.56rem;
//       margin-top:.92rem;
//     }
//     .greyBackground{
//       background:#ccc;
//     }
//   }
// </style>
