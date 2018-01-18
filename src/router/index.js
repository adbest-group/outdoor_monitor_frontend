import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Monitor from '@/components/monitor'
import MonitorInfo from '@/components/monitorInfo'
import Login from '@/components/login'
import Photo from '@/components/photo'
import PhotoCheck from '@/components/photoCheck'
import QuestionDetail from '@/components/questionDetail'
import ErrorCheck from '@/components/errorCheck'
import ErrorPhoto from '@/components/errorPhoto'
import Reward from '@/components/reward'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login' // 根目录跳到首页
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
      path: '/photoCheck',
      name: 'PhotoCheck',
      component: PhotoCheck
    },
    {
      path: '/errorCheck',
      name: 'ErrorCheck',
      component: ErrorCheck
    },
    {
      path: '/errorPhoto',
      name: 'ErrorPhoto',
      component: ErrorPhoto
    },
    {
      path: '/reward',
      name: 'Reward',
      component: Reward
    }
  ]
})
