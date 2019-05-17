<template>
  <div class="navigation">
    <div class="bar">
      <router-link tag="div" to="/" class="item iconfont">&#xe609;</router-link>
      <router-link tag="div" to="chests" class="item">Chests</router-link>
      <router-link tag="div" to="clans" class="item">Clans</router-link>
      <router-link tag="div" to="decks" class="item">Decks</router-link>
      <router-link tag="div" to="cards" class="item">Cards</router-link>
    </div>
    <keep-alive>
      <router-view class="pages"></router-view>
    </keep-alive>
    <!-- <router-view class="pages"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="stylus" scoped>
  border-style()
    1px solid rgba(34,36,38,.15)

  .bar
    display flex
    height 1.173333rem
    border-top border-style()
    border-bottom border-style()
    background-color rgba(0,0,0,.05)

    .item
      flex 1
      display flex
      justify-content center
      align-items center
      height 100%
      border-right border-style()
      font-size 16px

      &:nth-last-child(1)
        border-right none

  .pages
    box-sizing border-box
    padding .266667rem
</style>
