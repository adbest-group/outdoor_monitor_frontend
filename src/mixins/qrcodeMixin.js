import GLOBAL from '../config/global'
import {compress} from '../config/utils'
import Wrapper from '../components/wrapper.vue'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      ifDisplay: true
    }
  },
  components: {
    Wrapper
  },
  methods: {
    uploadWrap () {
      let input = this.$refs.firstInput
      input.click()
    },
    imgPhoto () {
      let input = this.$refs.firstInput
      let file = input
      this.ifDisplay = false
      compress(file, 0.1).then((data) => {
        // 执行上传操作
        let formData = new FormData()
        // formData.append('pic', file)
        console.log(data)
        formData.append('pic', data)
        this.axios({
          url: GLOBAL.URL.GET_QRCODE,
          method: 'post',
          contentType: 'multipart/form-data',
          data: formData
        }).then((r) => {
          console.log('新返回的二维码信息是：', r)
          if (r.ret.code === 101) {
            MessageBox.alert('二维码解析失败,请重试')
            this.ifDisplay = true
          } else {
            console.log('此时的任务类型是:', sessionStorage.getItem('currentType'))
            this.ifDisplay = true
            let qrcode = r.ret.result
            sessionStorage.setItem('qrcode', JSON.stringify(qrcode))
            // let origin = window.location.origin
            // location.href = `${origin}/#/monitorInfo`
            let currentType = sessionStorage.getItem('currentType')
            if (currentType === '1') { // 当前是主线任务,则判断二维码返回的ad_seat_id（广告位编号）是否和主线任务的广告位编号一致
              let currentTask = JSON.parse(sessionStorage.getItem('currentTask'))
              if (qrcode.ad_seat_id === currentTask.ad_seat_id) { // 一致则继续执行拍照
                this.$router.push({path: '/photo'})
              } else { // 不一致则提示不一致，返回首页列表
                MessageBox.alert('信息不一致，请重新拍照')
              }
            } else if (currentType === '2') { // 当前是纠错任务，展示二维码里的活动列表供选择，选择一个活动之后再进行监测
              // this.$router.push({path: '/errorPhoto'})
              this.$router.push({path: '/errorSelectTask'})
            }
          }
        }).catch((r) => {
          console.log(r)
          this.ifDisplay = true
        })
      })
    }
  }
}
