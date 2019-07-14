<template>
  <div class="notification">
    <v-alert
      :value="true"
      color="warning"
      icon="priority_high"
      outline
      v-show="warnShow"
      refs="updateBtn"
    >
      网络状况不好，页面信息来自缓存
      <v-btn
        icon
        color="warning"
        @click="reload"
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-alert>
  </div>
</template>

<script>
import { Workbox } from 'workbox-window'
export default {
  name: 'Notification',
  data () {
    return {
      warnShow: false,
      updateShow: false,
      wb: null
    }
  },
  methods: {
    reload () {
      this.wb.addEventListener('controlling', event => {
        window.location.reload()
      })
      this.wb.messageSW({ type: 'SKIP_WAITING' })
    }
  },
  mounted () {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        this.wb = new Workbox('/serviceWorker.js')

        this.wb.addEventListener('waiting', event => {
          this.warnShow = true
        })

        this.wb.register()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .notification
    position fixed
    bottom .533333rem
    right .533333rem
    >>> .v-alert
      padding 6px
</style>
