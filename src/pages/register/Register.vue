<template>
  <div class="register">
    <div class="wrapper">
      <span class="font">用户名</span>
      <span class="hint font" v-show="!isUserNameValidate">请输入6位用户名</span>
      <validate-input
        class="input"
        type="text"
        placeholder="username"
        regExp="\w{6}"
        :isValidate.sync="isUserNameValidate"
        :input.sync="username">
      </validate-input>
      <span class="font">密码</span>
      <span class="hint font" v-show="!isPasswordValidate">请输入6位密码</span>
      <validate-input
        class="input"
        type="password"
        regExp="\w{6}"
        placeholder="password"
        :isValidate.sync="isPasswordValidate"
        :input.sync="password">
      </validate-input>
      <router-link class="toggle font" tag="span" to="/login">登录</router-link>
      <button class="button" @click="register">注册</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      isUserNameValidate: false,
      isPasswordValidate: false
    }
  },
  methods: {
    register () {
      if (this.isUserNameValidate && this.isPasswordValidate) {
        axios.post(
          '/auth/register',
          {
            username: this.username,
            password: this.password
          }
        ).then(res => {
          localStorage.setItem('username', res.data.username)
          this.$router.push('/user')
        }).catch(() => {
          alert('user exist')
        })
      } else {
        alert('格式不正确')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .register
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

      .hint
        margin-top .266667rem
        color red

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
