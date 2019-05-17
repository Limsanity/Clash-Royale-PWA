import MyTopBar from './TopBar.vue'

const TopBar = {
  install: function (Vue) {
    Vue.component('TopBar', MyTopBar)
  }
}

export default TopBar
