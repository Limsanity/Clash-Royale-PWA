<template>
  <div class="notification" v-show="show">
    <button @click="reload">更新</button>
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
    const updatesChannel = new BroadcastChannel('index-update')
    updatesChannel.addEventListener('message', async () => {
      this.show = true
    })
  }
}
</script>

<style lang="stylus" scoped>
  .notification
    position fixed
    bottom .533333rem
    right .533333rem
</style>
