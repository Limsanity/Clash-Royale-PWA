<template>
  <div class="user">
    <div class="bar">
      <span class="item">{{auth.username}}</span>
      <span class="item" @click="logout">Log out</span>
    </div>
    <div class="menu-wrapper">
      <div class="menu">
        <router-link class="menu-item choosed" to="decks" tag="div">Decks</router-link>
        <router-link class="menu-item" to="clans" tag="div">Clans</router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'User',
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    ...mapMutations(['removeAuth']),
    logout () {
      this.removeAuth()
      axios.get('/auth/logout')
        .then(res => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .user
    .bar
      display flex
      height 1.066667rem
      font-size 14px
      background-color #2185d0

      .item
        display flex
        align-items center
        font-weight bold
        color white
        padding 0 10px
        border-right 1px solid rgba(34,36,38,.2)

    .menu-wrapper
      margin .426667rem
      .menu
        height 1.338667rem
        display flex
        font-size 18px
        .menu-item
          flex 1
          display flex
          justify-content center
          align-items center
          border-bottom .026667rem solid
          border-color #d4d4d5

        .router-link-exact-active
          background-color white
          border-left .026667rem solid
          border-top .026667rem solid
          border-right .026667rem solid
          border-bottom 0
          border-color #d4d4d5
          border-radius .16rem .16rem 0 0

</style>
