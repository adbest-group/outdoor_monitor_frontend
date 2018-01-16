import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Monitor from '@/components/monitor'
import MonitorInfo from '@/components/monitorInfo'
import Login from '@/components/login'
import Photo from '@/components/photo'
import PhotoCheck from '@/components/photoCheck'
import QuestionDetail from '@/components/questionDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index' // 根目录跳到首页
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: Monitor
    },
    {
      path: '/monitorInfo',
      name: 'monitorInfo',
      component: MonitorInfo
    },
    {
      path: '/photo',
      name: 'photo',
      component: Photo
    },
    {
      path: '/questionDetail',
      name: 'questionDetail',
      component: QuestionDetail
    },
    {
      path: '/PhotoCheck',
      name: 'PhotoCheck',
      component: PhotoCheck
    }
  ]
})
