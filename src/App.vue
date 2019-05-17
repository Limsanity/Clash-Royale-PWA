<template>
  <div id="app">
    <top-bar></top-bar>
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

    .content
      position relative
      top 1.216rem

    input
      -webkit-appearance none
</style>
