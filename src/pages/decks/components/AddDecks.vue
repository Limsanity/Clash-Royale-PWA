<template>
  <div v-if="playerInfo">
    <div class="mask"></div>
    <div class="selected">
      <img
        class="card"
        v-for="(item, index) in selected"
        :key="item.id"
        :src="loadImg('cards', item.key)"
        @click="remove(index)"
      >
      <span class="empty"></span>
      <span class="empty"></span>
    </div>
    <div
      class="wrapper"
      ref="cards"
    >
      <img
        class="card"
        v-lazy
        v-for="item of playerInfo.cards"
        :key="item.id"
        :data-src="loadImg('cards', item.key)"
        @click="choose(item)"
      >
      <span class="empty"></span>
      <span class="empty"></span>
    </div>
    <div class="button">
      <button class="item ok" @click="ok">OK</button>
      <button class="item cancel" @click="cancel">CANCEL</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loadImg from '@/mixins/loadImg'
export default {
  name: 'AddDeck',
  mixins: [loadImg],
  data () {
    return {
      selected: [],
      startY: 0,
      endY: 0,
      status: true
    }
  },
  computed: {
    ...mapState(['playerInfo'])
  },
  methods: {
    choose (item) {
      if (this.selected.length === 8 ||
          this.selected.includes(item)) {
        return
      }
      this.selected.push(item)
    },
    remove (index) {
      this.selected.splice(index, 1)
    },
    ok () {
      this.$emit('done', this.selected)
    },
    cancel () {
      this.$emit('done', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .card, .empty
    width 1.866667rem

  .card
    height 2.24rem

  .mask
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(black, 0.6)

  .selected
    display flex
    flex-wrap wrap
    justify-content space-between
    box-sizing border-box
    position fixed
    width 9rem
    top 5%
    left 50%
    transform translateX(-50%)
    padding .4rem

  .wrapper
    overflow scroll
    box-sizing border-box
    display flex
    justify-content space-between
    align-content flex-start
    flex-wrap wrap
    position fixed
    left 50%
    top 30%
    transform translate(-50%)
    width 9rem
    height 10.826667rem
    padding .4rem
    background-color white
    border-radius .2rem

  .button
    position fixed
    display flex
    left 50%
    transform translateX(-50%)
    bottom 10%

    .item
      width 2.666667rem
      height 1.066667rem
      margin 0 .533333rem
      color white
      font-size 16px
      font-weight bold
      border none
      outline none
      border-radius .16rem

    .ok
      background-color #1296db

    .cancel
      background-color #d80505
</style>
