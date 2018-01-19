/* calculate length of the input value */

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
