import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Player from '@/pages/player/Player'
import Chests from '@/pages/chests/Chests'
import Clans from '@/pages/clans/Clans'
import Decks from '@/pages/decks/Decks'
import Cards from '@/pages/cards/Cards'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import User from '@/pages/user/User'
import myClan from '@/pages/user/components/Clans'

import axios from 'axios'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/player/:tag',
      name: 'Player',
      redirect: '/player/:tag/chests',
      component: Player,
      children: [
        {
          path: 'chests',
          name: 'Chests',
          component: Chests
        },
        {
          path: 'clans',
          name: 'Clans',
          component: Clans
        },
        {
          path: 'cards',
          name: 'Cards',
          component: Cards
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      redirect: '/user/decks',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'decks',
          name: 'Deck',
          component: Decks
        },
        {
          path: 'clans',
          name: 'myClan',
          component: myClan
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!router.app.$store || !router.app.$store.state.auth) {
      axios.post('/auth/login')
        .then((res) => {
          const { success, data } = res.data
          if (success) {
            router.app.$store.state.auth = data
            navigator.serviceWorker.controller.postMessage(data.token)
            next()
          } else {
            next({ path: '/login' })
          }
        })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
