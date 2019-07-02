<template>
  <div class="info">
    <div class="wrapper" v-if="playerInfo">
      <h2 class="player-name">{{ playerInfo.name }}</h2>

      <div class="button">
        <v-icon class="item follow">favorite_outline</v-icon>
        <v-icon class="item external">launch</v-icon>
      </div>

      <div class="level">
        <span class="trophy">{{ playerInfo.trophies }} / {{ playerInfo.stats.maxTrophies }}</span>
        <img src="https://royaleapi.com/static/img/ui/trophy.png" alt="" class="badge">
        <span class="position">{{ playerInfo.arena.name }}</span>
      </div>

      <div class="clan">
        <img :src="`/images/badges/${playerInfo.clan.badge.name}.png`" alt="" class="badge">
        <span class="clan-name">{{ playerInfo.clan.name }}</span>
        <span class="clan-tag">#{{ playerInfo.clan.tag }}</span>
        <span class="clan-role">{{ playerInfo.clan.role }}</span>
      </div>

      <img class="arena" :src="`/images/arenas/arena${playerInfo.arena.arenaID}.png`" alt="">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Info',
  computed: {
    ...mapState(['playerInfo'])
  }
}
</script>

<style lang="stylus" scoped>
  separate()
    position absolute
    left -0.266667rem
    top 0
    bottom 0
    display inline-block
    content ' '
    width .053333rem
    height .4rem
    margin auto
    background-color #d4d4d5

  .info
    box-sizing border-box
    height 5.813333rem
    padding .426667rem
    background-color #fff !important

    .wrapper
      display flex
      flex-direction column
      justify-content space-between
      position relative
      height 100%

      .player-name
        margin 0
        font-size 26px

      .button
        display flex

        .item
          display inline-block
          position relative
          width 1.12rem
          height 1.12rem
          line-height 1.12rem
          text-align center
          border solid .053333rem
          border-radius 50%
          font-size 20px

        .follow
          color #e03997
          border-color #e03997
          margin-right .266667rem

        .external
          color #1296db
          border-color #1296db

      .level
        display flex
        align-items center
        font-size 14px

        .badge
          display inline-block
          position relative
          width .506667rem
          height .506667rem
          margin auto
          margin-left .266667rem
          margin-right .533333rem

        .position
          position relative
          &::before
            separate()

      .clan
        display flex
        font-size 14px

        .badge
          width .933333rem
          height 1.109333rem

        .clan-name
          position relative
          line-height 1.109333rem
          margin-left .533333rem
          margin-right .533333rem
          text-overflow ellipsis
          white-space nowrap
          overflow hidden

        .clan-tag
          position relative
          line-height 1.109333rem
          margin-right .533333rem
          &::before
            separate()

        .clan-role
          position relative
          line-height 1.109333rem
          &::before
            separate()

      .arena
        position absolute
        width 1.92rem
        height 1.92rem
        top 0
        right .533333rem

</style>
