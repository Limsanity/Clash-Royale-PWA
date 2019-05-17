<template>
  <div class="search">
    <span class="search-desc">Player</span>
    <input type="text" class="search-input" placeholder="tag e.g.20Q2U9UQQ">
    <span class="icon iconfont">&#xe632;</span>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="stylus" scoped>
  .search
    display flex
    height .834667rem
    background-color #2185d0

    .search-desc
      padding 0 .266667rem
      line-height .834667rem
      color #ffffff
      font-size 16px

    .search-input
      flex 1
      padding 0 .266667rem
      border none
      background #2185d0
      color #ffffff
      font-size 14px
      outline none

      &::placeholder
        color #c5c7c9

    .icon
      display flex
      margin-right .266667rem
      align-items center
      color white
</style>
