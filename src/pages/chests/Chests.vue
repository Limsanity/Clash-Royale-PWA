<template>
  <div class="chests">
    <h1 class="title">Chests</h1>
    <div class="chests-list">
      <div class="item" v-for="(item, index) in chestsList" :key="index">
        <img :src="loadImg('chests', 'chest-' + item.type.toLowerCase())" alt="" class="pic">
        <span class="order">+{{ item.idx }}</span>
      </div>
      <div class="empty"></div>
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>
import axiosIns from 'utils/axiosInstance.js'
import fetchDataMixin from '@/mixins/fetchData'
import loadImg from '@/mixins/loadImg'
export default {
  name: 'Chests',
  mixins: [fetchDataMixin, loadImg],
  data () {
    return {
      playerTag: null,
      chestsList: []
    }
  },
  methods: {
    fetchData (tag) {
      this.chestsList = []
      axiosIns.get(`/player/${tag}/chests`)
        .then(res => {
          const data = res.data
          for (let key in data) {
            if (key === 'upcoming') {
              data[key].forEach((type, idx) => {
                this.chestsList.push({
                  type,
                  idx: idx + 1
                })
              })
            } else {
              this.chestsList.push({
                type: key,
                idx: data[key]
              })
            }
          }
        })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchData(to.params.tag)
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .chests
    .title
      margin 0
      font-size 20px

    .chests-list
      display flex
      flex-wrap wrap
      justify-content space-between

      .item
        position relative
        box-sizing border-box
        width 2.266667rem
        height 2.266667rem
        padding .266667rem

        .pic
          width: 100%
          height 100%

        .order
          display flex
          justify-content center
          align-items center
          position absolute
          top 0
          right 0
          min-width .8rem
          height .746667rem
          padding .053333rem
          font-size 16px
          background-color #fff
          border-radius 1rem
          border 1px solid rgba(34,36,38, .15)

      .empty
        width 2.266667rem
        height 0
</style>
