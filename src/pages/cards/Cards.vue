<template>
  <div class="cards" v-if="playerInfo">
    <h1 class="title">Cards</h1>
    <div class="cards-list">
      <div class="item" v-for="item of playerInfo.cards" :key="item.id">
        <img v-lazy src="" :data-src="loadImg('cards', item.key)" alt="" class="pic">
        <div class="upgrade-wrapper">
          <span
            class="upgrade"
            :style="item | upgradeStyle"
          ></span>
        </div>
        <span class="number">
          {{ item.requiredForUpgrade === 'Maxed' ? 'Max' : `${item.count} / ${item.requiredForUpgrade}` }}
        </span>
        <span class="level">level {{ item.displayLevel }}</span>
      </div>
      <div class="empty"></div>
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loadImg from '@/mixins/loadImg'
export default {
  name: 'Cards',
  mixins: [loadImg],
  computed: {
    ...mapState(['playerInfo'])
  },
  filters: {
    upgradeStyle: function (item) {
      const isMaxed = item.requiredForUpgrade === 'Maxed'
      const canUpgrade = item.requiredForUpgrade <= item.count
      const style = {
        width: isMaxed ? '100%' : canUpgrade ? '100%' : (item.count / item.requiredForUpgrade) * 100 + '%',
        backgroundColor: isMaxed ? '#cc3b33' : canUpgrade ? '#3c85ca' : '#56b654'
      }
      return style
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cards
    .title
      margin 0
      font-size 20px

    .cards-list
      display flex
      flex-wrap wrap
      justify-content space-between

      .item
        position relative
        display flex
        flex-direction column
        align-items center

        .pic
          width 2.133333rem
          height 2.56rem

        .upgrade-wrapper
          width 1.92rem
          height .112rem
          background-color rgba(0,0,0,.1)
          border-radius .1rem
          overflow hidden

          .upgrade
            display block
            width 80%
            height 100%
            background-color #3c85ca

        .number
          font-size 10px

        .level
          position absolute
          top 1.6rem
          font-size 16px
          font-weight bold
          color white

      .empty
        width 2.133333rem
        height 0

</style>
