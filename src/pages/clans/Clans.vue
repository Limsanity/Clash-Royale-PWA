<template>
  <div class="clans">
    <h1 class="title" @click="test">Clans</h1>
    <div class="clan-bar">
      <p class="bar-item">名称</p>
      <p class="bar-item">职位</p>
      <p class="bar-item">胜率</p>
      <p class="bar-item">胜场</p>
      <p class="bar-item">参与</p>
    </div>
    <div class="clan-list">
      <div
        class="clan-list-item"
        v-for="(item, index) in clanInfo"
        :key="index"
      >
        <p class="clan-list-item-style">{{item.name}}</p>
        <p class="clan-list-item-style">{{item.role}}</p>
        <p class="clan-list-item-style">{{item.participate !== 0 ? (item.win / item.participate).toFixed(2) : 0}}</p>
        <p class="clan-list-item-style">{{item.win}}</p>
        <p class="clan-list-item-style">{{item.participate}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Clans',
  computed: {
    ...mapState(['clanInfo'])
  }
}
</script>

<style lang="stylus" scoped>
  .clans
    .title
      margin 0
      font-size 20px

    .clan-bar
      display flex
      justify-content space-between
      border solid .02rem
      border-color rgba(gray, 0.5)
      border-left none
      border-right none
      font-size 14px

      .bar-item
        flex 1
        padding .1rem
        margin 0
        text-align center
        border-right solid .02rem
        border-color rgba(gray, 0.5)
        &:nth-last-child(1)
          border-right none

    .clan-list
      font-size 14px
      .clan-list-item
        display flex
        &:nth-child(2n+1)
          background-color rgba(gray, 0.1)
        .clan-list-item-style
          flex 1
          margin 0
          padding .2rem .1rem
          border solid .02rem
          border-color rgba(gray, 0.5)
          border-top none
          border-left none
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          &:nth-last-child(1)
            border-right none
</style>
