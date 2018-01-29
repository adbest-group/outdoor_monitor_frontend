/* calculate length of the input value */
import { MessageBox } from 'mint-ui'
// 移除class
export function removeClass (element, className) {
  if (element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    element.className = element.className.replace(reg, ' ')
  }
  return element
}

// 添加class
export function addClass (element, className) {
  if (!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) element.className += ' ' + className
  return element
}

// 判断是否为json格式的字符串
export function isJSON (str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object') {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return false
}

// 时间格式化
export function formatDate (date, flag) {
  date = new Date(date)
  let month = date.getMonth() + 1
  month = month >= 10 ? month : '0' + month
  let day = date.getDate()
  day = day >= 10 ? day : '0' + day
  let hours = date.getHours()
  hours = hours >= 10 ? hours : '0' + hours
  let minutes = date.getMinutes()
  minutes = minutes >= 10 ? minutes : '0' + minutes
  if (flag === 'today') {
    return '今天' + '  ' + hours + ':' + minutes
  } else if (flag === 'yesterday') {
    return '昨天' + '  ' + hours + ':' + minutes
  } else {
    return month + '-' + day + '  ' + hours + ':' + minutes
  }
}
// 判断是昨天还是今天
export function isYesterday (date) {
  let now = new Date()
  let currentDay = new Date(date)
  // 判断是否是昨天
  let yesterday = new Date(now.getTime() - 1000 * 3600 * 24)
  if (currentDay.getFullYear() === yesterday.getFullYear() && currentDay.getMonth() === yesterday.getMonth() && currentDay.getDay() === yesterday.getDay()) {
    // 当前时间是昨天
    return formatDate(date, 'yesterday')
  } else if (currentDay.getFullYear() === now.getFullYear() && currentDay.getMonth() === now.getMonth() && currentDay.getDay() === now.getDay()) {
    // 当前时间是今天
    return formatDate(date, 'today')
  } else {
    // 其他
    return formatDate(date)
  }
}

export function ifQrcode (_this) {
  if (sessionStorage.getItem('qrcode')) {
    let data = sessionStorage.getItem('qrcode')
    // 将此信息解析为json
    if (isJSON(data)) {
      _this.qrcode = JSON.parse(data)
    } else {
      console.log('保存的二维码信息不是json格式或二维码未扫描成功')
      MessageBox({
        title: '二维码扫描失败',
        message: '请尝试重新扫描二维码',
        confirmButtonText: '确定'
      }).then((val) => {
        history.go(-1)
      })
    }
  } else {
    console.log('二维码信息未保存到本地存储里')
  }
}
/*
* 图片压缩
* img    原始图片
* width   压缩后的宽度
* height  压缩后的高度
* ratio   压缩比率
*/
/* eslint-disable */
export function compress (imgs, ratio) {
  var canvas, ctx, img64, scale, w, h,image
  if(Object.prototype.toString.call(imgs) === '[object Array]'){
    let arrTemp = []
    for(let i = 0; i < imgs.length ;i++){
      let reader = new FileReader()
      reader.readAsDataURL(imgs[i].files[0])
      let a = new Promise((resolve,reject)=>{
        reader.onload = function(e){
          image = new Image()
          image.src = e.target.result
          image.onload = function () {
            var that = this
            // 默认按比例压缩
            w = that.width
            h = that.height
            scale = w / h
            canvas = document.createElement('canvas')
            canvas.width = w
            canvas.height = h
            ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, w, h)
            img64 = canvas.toDataURL('image/jpeg', ratio)
            resolve(img64)
          }
        }
      })
      arrTemp.push(a)
    }
    let read = Promise.all(arrTemp)

    return read
  }else if(Object.prototype.toString.call(imgs) === '[object HTMLInputElement]'){
    let reader = new FileReader()
    reader.readAsDataURL(imgs.files[0])
    let base64 = new Promise((resolve,reject)=>{
      reader.onload = function(e){
        image = new Image()
        image.src = e.target.result
        image.onload = function () {
          var that = this
          // 默认按比例压缩
          w = that.width
          h = that.height
          scale = w / h
          canvas = document.createElement('canvas')
          canvas.width = w
          canvas.height = h
          ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0, w, h)
          img64 = canvas.toDataURL('image/jpeg', ratio)
          resolve(img64)
        }
      }
    })
    return base64
  }else{
    console.log(Object.prototype.toString.call(imgs))
  }
}
export function alertByte (base64_str){
  let str = base64_str.substring(22);
  var equalIndex= str.indexOf('=');
  if (str.indexOf('=')>0) {
    str=str.substring(0, equalIndex);
  }
  var strLength=str.length;
  var fileLength=parseInt(strLength-(strLength/8)*2);
  return fileLength
}
