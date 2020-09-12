import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../components/Auth'
import Dashboard from '../components/Dashboard'
import HostList from '../components/HostList'
import TokenList from '../components/TokenList'
import HostDetail from '../components/HostDetail'
import TaskDetail from '../components/TaskDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'auth',
      component: Auth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'host',
          name: 'hostList',
          component: HostList
        },
        {
          path: 'host/:id',
          name: 'hostDetail',
          component: HostDetail
        },
        {
          path: 'token',
          name: 'tokenList',
          component: TokenList
        },
        {
          path: 'task/:hostId/:taskId',
          name: 'taskDetail',
          component: TaskDetail
        }
      ]
    }
  ]
})
