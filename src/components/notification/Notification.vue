<template>
  <div class="notification">
    <v-alert
      :value="true"
      color="success"
      icon="check_circle"
      outline
      v-show="updateShow"
    >
      有新的内容
      <v-btn
        icon
        color="success"
        @click="reloadForUpdate"
      >
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-alert>
    <v-alert
      :value="true"
      color="warning"
      icon="priority_high"
      outline
      v-show="warnShow"
    >
      网络状况不好，页面信息来自缓存
      <v-btn
        icon
        color="warning"
        @click="reloadForStale"
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
      warnShow: false,
      updateShow: false
    }
  },
  methods: {
    reloadForStale () {
      location.assign('/')
    },
    reloadForUpdate () {
      location.assign(location.href + '/?cache=true')
    }
  },
  mounted () {
    navigator.serviceWorker.ready.then(() => {
      navigator.serviceWorker.addEventListener('message', (e) => {
        console.log(e.data)
        if (!this.updateShow && e.data.includes('stale')) {
          this.warnShow = true
        } else if (this.warnShow && e.data.includes('update')) {
          this.warnShow = false
          this.updateShow = true
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
