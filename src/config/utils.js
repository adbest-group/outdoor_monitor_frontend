/* calculate length of the input value */
import GLOBAL from '@/config/global'
import axios from 'axios'
import wx from 'weixin-js-sdk'
export function getWechatCongig () {
  return new Promise((resolve, reject) => {
    axios({
      url: GLOBAL.URL.GET_SIGNATURE,
      method: 'get',
      params: {
        url: location.href.split('#')[0]
        // url: 'http://jlhtest.adt100.com'
      }
    }).then((res) => {
      console.log(res, 'chat')
      // console.log(res, '111');
      if (res.status === 200 && res.data) {
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonce,
          signature: res.data.signature,
          jsApiList: ['getLocation']
        })
        wx.ready(function () {
          alert(222)
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              // console.log(1111)
              alert(111)
              console.log(res)
              // let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
              // var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
              // var speed = res.speed // 速度，以米/每秒计
              // var accuracy = res.accuracy // 位置精度
            }
          })
        })
        resolve(wx)
      }
    })
  })
}

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

// 获取微信openId
export function getOpenId () {
  // sessionStorage.setItem('openId', 'on2l30nibxGCb_u4wb3T2Fs02MM8')
  if (localStorage.getItem('openId')) {
    localStorage.removeItem('openId')
  }

  if (sessionStorage.getItem('openId')) {
    return new Promise(resolve => {
      resolve(sessionStorage.getItem('openId'))
    })
  }

  let url
  if (location.href.indexOf('code') > -1) {
    url = location.href
  } else {
    alert('请从微信客户端打开！')
    return
  }
  let list = url.split('?')
  let paramList = list[1].split('&')
  let codeList = paramList[0].split('=')
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: GLOBAL.URL.GETOPENID,
      params: {
        code: codeList[1]
      }
    }).then(res => {
      if (res.data.code === 200) {
        sessionStorage.setItem('openId', res.data.data)
        resolve(res.data.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  })
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

export function wxConfig () {
  return new Promise((resolve, reject) => {
    axios({
      url: '/wx/signatureJSSDK',
      method: 'get',
      params: {
        url: location.href.split('#')[0]
      },
      requireLogin: false
    }).then(res => {
      if (res.data.data) {
        let data = res.data.data
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: ['hideAllNonBaseMenuItem', 'showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'openLocation', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      }
    })
    wx.ready(function () {
      resolve()
    })
    wx.error(function (res) {
      reject(res)
    })
  })
}

export function wxShare (title, desc, link, img, share = false) {
  wxConfig().then(() => {
    wx.hideAllNonBaseMenuItem()
    if (share) {
      wx.showMenuItems({
        menuList: [
          'menuItem:share:appMessage',
          'menuItem:share:timeline',
          'menuItem:favorite',
          'menuItem:profile',
          'menuItem:addContact'
        ] // 要显示的菜单项，所有menu项见附录3
      })
      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: img, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          // console.log(shareLink);
        }
      })
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: img, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    }
  })
}
