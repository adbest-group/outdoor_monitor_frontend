import GLOBAL from '../config/global'
import {compress} from '../config/utils'
export default {
  data () {
    return {

    }
  },
  methods: {
    uploadWrap () {
      let input = this.$refs.firstInput
      input.click()
    },
    imgPhoto () {
      let input = this.$refs.firstInput
      let file = input
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
          console.log(r)
          let qrcode = r.ret.result
          // qrcode = {
          //   activity_name: '可口可乐2018新年投放95',
          //   ad_activity_seat_id: 6,
          //   ad_seat_name: '新联路1号灯箱',
          //   pic_url: 'http://www.dealswill.com/static/demo.png'
          // }
          sessionStorage.setItem('qrcode', JSON.stringify(qrcode))
          let origin = window.location.origin
          location.href = `${origin}/#/monitorInfo`
        }).catch((r) => {
          console.log(r)
        })
      })
    }
  }
}
