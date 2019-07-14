<template>
  <div class="search">
    <span class="search-desc">Player</span>
    <input type="text" class="search-input" placeholder="tag e.g.20Q2U9UQQ">
    <v-icon class="icon">search</v-icon>
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
    height 31px
    background-color #2185d0

    .search-desc
      padding 0 10px
      line-height 31px
      color #ffffff
      font-size 16px

    .search-input
      flex 1
      padding 0 10px
      border none
      background #2185d0
      color #ffffff
      font-size 14px
      outline none

      &::placeholder
        color #c5c7c9

    .icon
      display flex
      margin-right 10px
      align-items center
      color white
      background-color #2185d0 !important
</style>
