<template>
  <div class="user">
    <div class="bar">
      <span class="item">{{username}}</span>
      <span class="item" @click="logout">Log out</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'User',
  data () {
    return {
      username: localStorage.getItem('username')
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('username')
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
</style>
