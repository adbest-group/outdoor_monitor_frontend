import { initBtn } from '../config/qrcodeRequire'

export default {
  data () {
    return {
      imgArr: [], // 存放四张图片
      status: 0// 审核状态，包含待审核、未审核通过、已审核通过三种状态
    }
  },
  computed: {
    currentTask () {
      return this.$store.getters.getCurrentTask
    }
  },
  methods: {
    upload (c, d) {
      let _this = this
      let $c = document.querySelector(c)
      let $d = document.querySelector(d)
      let file = $c.files[0]
      let length = c.length - 1
      let index = c.substr(length, 1)
      // 同时放入本地临时数组中
      _this.imgArr[index] = file
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        $d.setAttribute('src', e.target.result)
        let str = (d + 'Dis').substr(1)
        _this[str] = true
      }
    },
    imgClick (val) {
      let input = document.querySelector('#fileBtn' + val)
      input.click()
    },
    handleClick () {
      history.back()
    }
  },
  mounted () {
    initBtn()
  }
}
