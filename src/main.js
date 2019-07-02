/* eslint-disable no-console */
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import App from './App'
import router from './router'
import store from './store'
import TopBar from './components/topbar'
import ValidateInput from './components/validateInput'
import Notification from './components/notification'
import FastClick from 'fastclick'

import 'vuetify/src/stylus/app.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Vuetify, {
  iconfont: 'md'
})
Vue.use(TopBar)
Vue.use(ValidateInput)
Vue.use(Notification)
FastClick.attach(document.body)

Vue.directive('lazy', {
  inserted: function (el) {
    if ('IntersectionObserver' in window) {
      let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target
            lazyImage.src = lazyImage.dataset.src
            lazyImageObserver.unobserve(lazyImage)
          }
        })
      })
      lazyImageObserver.observe(el)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
    // navigator.serviceWorker.ready.then((registration) => {
    //   registration.pushManager.subscribe({ userVisibleOnly: true })
    // })
  })
}
