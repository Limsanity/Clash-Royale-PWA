// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import TopBar from './components/topbar'
import ValidateInput from './components/validateInput'
import 'styles/iconfont.css'

Vue.config.productionTip = false

Vue.use(TopBar)
Vue.use(ValidateInput)

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
  router,
  store,
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
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.subscribe({ userVisibleOnly: true })
    })
  })
}

const updatesChannel = new BroadcastChannel('index-update')
updatesChannel.addEventListener('message', async () => {
  // console.log(1)
  location.reload()
})
