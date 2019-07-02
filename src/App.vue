<template>
  <div id="app">
    <v-app>
      <top-bar></top-bar>
      <notification></notification>
      <router-view class="content"/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
  html, body
    width 100%
    margin 0
    padding 0
    font-size 37.5px !important

    .content
      position relative
      top 1.493333rem

    input
      -webkit-appearance none

    .topbar__menu
      .item
        padding .3rem .4rem
        text-align center
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        border-left solid .026667rem
        border-bottom solid .026667rem
        border-color rgba(gray, 0.2)
        font-size 12px
        font-weight bold
        background-color #fff

        &:nth-last-child(1)
          border-bottom-left-radius .133333rem
</style>
