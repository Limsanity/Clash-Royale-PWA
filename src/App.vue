<template>
  <div id="app">
    <top-bar></top-bar>
    <notification></notification>
    <router-view class="content"/>
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
    font-size 37.5px
    background-color #f5f5f5

    .content
      position relative
      top 1.216rem

    input
      -webkit-appearance none
</style>
