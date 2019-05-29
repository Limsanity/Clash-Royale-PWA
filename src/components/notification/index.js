import myNotification from './Notification.vue'

const Notification = {
  install: function (Vue) {
    Vue.component('Notification', myNotification)
  }
}

export default Notification
