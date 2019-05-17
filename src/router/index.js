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
          path: 'decks',
          name: 'Decks',
          component: Decks
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
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios.post('/auth/login')
      .then((res) => {
        const { success, username } = res.data
        if (success) {
          localStorage.setItem('username', username)
          next()
        } else {
          next({ path: '/login' })
        }
      })
  } else {
    next()
  }
})

export default router
