<template>
  <div class="chests">
    <h1 class="title">Chests</h1>
    <div class="chests-list">
      <div class="item" v-for="(item, index) in chestsList" :key="index">
        <v-badge
          right
          overlap
          color="cyan"
        >
          <template v-slot:badge>
            <span class="order">{{ item.idx }}</span>
          </template>
          <img :src="loadImg('chests', 'chest-' + item.type.toLowerCase())" alt="" class="pic">
        </v-badge>
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
        width 85px
        height 85px
        padding 10px

        .pic
          width: 100%
          height 100%

        >>>.v-badge__badge
          min-width 30px
          min-height 30px

      .empty
        width 85px
        height 0
</style>
