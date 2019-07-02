<template>
  <div class="notification" v-show="show">
    <v-alert
      :value="true"
      color="warning"
      icon="priority_high"
      outline
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
export default {
  name: 'Notification',
  data () {
    return {
      show: false
    }
  },
  methods: {
    reload () {
      this.show = false
      location.reload()
    }
  },
  mounted () {
    navigator.serviceWorker.ready.then(() => {
      navigator.serviceWorker.addEventListener('message', (e) => {
        this.show = true
        if (e.data === 'stale') {
          this.show = true
        }
      })
    })
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
