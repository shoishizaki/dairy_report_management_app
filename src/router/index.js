import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/components/Home')
const Create = () => import('@/components/CreateReport')
const List = () => import('@/components/ReportList')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/create',
      name: 'CreateReport',
      component: Create
    },

    {
      path: '/list',
      name: 'ReportList',
      component: List
    }
  ]
})
