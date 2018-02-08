import axios from 'axios'
// import qs from 'qs'
import { Toast } from 'mint-ui'
// import Cookies from 'js-cookie'
import router from '../router'

const Axios = axios.create({
  baseURL: '/',
  timeout: 50000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(config => {
  // debugger
  // if (
  //   (config.method === 'post' ||
  //   config.method === 'put' ||
  //   config.method === 'delete') && config.contentType !== 'application/json'
  // ) {
  //   // 序列化
  //   config.data = qs.stringify(config.data || {})
  // } else {
  //   config.data = config.data || {}
  // }
  // if (config.method === 'post' && config.contentType === 'application/x-www-form-urlencoded') {
  //   config.data = qs.stringify(config.data || {})
  // }
  config.data = config.data || {}
  if (config.contentType) {
    config.headers.post['Content-Type'] = config.contentType
    // config.headers['Content-Type'] = config.contentType;
  }
  return config
}, error => {
  return Promise.reject(error.data.error.message)
})

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    if (res.data.code === 500) {
      Toast(res.data.msg)
    }
    console.log(res)
    if (res.data.ret) {
      if (res.data.ret.code === 103) { // 未登录或者登陆超时
        sessionStorage.clear()
        router.push({path: '/login'})
      }
    }
    return Promise.resolve(res.data)
  }, error => {
  // console.log(error)
    if (error.response) {
      if (error.response.status === 404) {
        console.log(this)
        // router.push({
        //   path: '/notfound'
        // })
      } else if (error.response.status === 500) {}
    }
    if (error.data) {
      let errorInfo = error.data.error ? error.data.error.message : error.data
      return Promise.reject(errorInfo)
    } else {
      return Promise.reject(error)
    }
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, 'axios', {
      value: Axios
    })
  }
}
