<template>
  <div class="login">
    <div class="wrapper">
      <span class="font">用户名</span>
      <input class="input" type="text" placeholder="username" v-model="username">
      <span class="font">密码</span>
      <input class="input" type="password" placeholder="password" v-model="password">
      <router-link class="toggle font" tag="span" to="/register">注册</router-link>
      <button class="button" @click="login">登陆</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    ...mapActions(['setAuth']),
    login () {
      axios.post(
        '/auth/login',
        {
          username: this.username,
          password: this.password
        }
      ).then(res => {
        const { success, data } = res.data
        if (success) {
          this.setAuth(data)
          navigator.serviceWorker.controller.postMessage(data.token)
          this.$router.push('/user')
        } else {
          alert(data)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login
    color white
    position absolute
    bottom 0
    left 0
    right 0
    background-color #25262b

    .wrapper
      position relative
      top 35%
      display flex
      flex-direction column
      justify-content center
      margin 0 40px

      .font
        color #b9bbbe
        font-weight bold
        font-size 12px

      .input
        margin .266667rem 0
        color white
        background-color rgba(0,0,0,.1)
        padding .266667rem
        font-size 16px
        border solid black .026667rem
        border-radius .106667rem
        outline none

      .toggle
        align-self flex-end
        margin-bottom  .266667rem

      .button
        padding 10px
        font-size 16px
        font-weight bold
        color white
        background-color #7289da
        border none
        border-radius .053333rem
</style>
