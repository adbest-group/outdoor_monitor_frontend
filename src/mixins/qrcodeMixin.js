import GLOBAL from '../config/global'
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
      console.log(GLOBAL)
      let input = this.$refs.firstInput
      let file = input.files[0]
      // 执行上传操作
      let formData = new FormData()
      formData.append('pic', file)
      // console.log('要上传的二维码文件是：', file)
      // let qrcode = {// 模拟获取到的假数据
      //   'activity_id': '12345678',
      //   'activity_name': 'KFC CNY闻鸡起舞堡',
      //   'ad_location_id': '123',
      //   'ad_localtion_name': '人民广场候车亭-1',
      //   'pic_url': 'http://ghostxx.com/uploads/images/20160722/6360479595338004853663403.jpg',
      //   'lon': '120.123',
      //   'lat': '120.123'
      // }
      this.axios({
        url: GLOBAL.URL.GET_QRCODE,
        method: 'post',
        contentType: 'multipart/form-data',
        data: formData
      }).then((r) => {
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
    }
  }
}
