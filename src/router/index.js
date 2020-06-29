import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/components/Home')
const Create = () => import('@/components/CreateReport')
const List = () => import('@/components/ReportList')
const SignUp = () => import('@/components/SignUp')
const Login = () => import('@/components/Login')

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
    },

    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
