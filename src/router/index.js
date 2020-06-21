import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/components/Home')
const Create = () => import('@/components/CreateReport')

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
    }
  ]
})
