<template>
  <div>
    <search></search>
    <info></info>
    <navigation></navigation>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axiosIns from 'utils/axiosInstance.js'
import axios from 'axios'
import Search from './components/Search'
import Info from './components/Info'
import Navigation from './components/Navigation'
export default {
  name: 'Player',
  components: {
    Search,
    Info,
    Navigation
  },
  computed: {
    ...mapState(['visited', 'playerInfo'])
  },
  methods: {
    ...mapMutations(['setPlayerInfo', 'removePlayerInfo', 'setClanInfo', 'removeClanInfo']),
    fetchData (tag) {
      this.removePlayerInfo()
      this.getPlayerInfo(tag)
        .then(() => {
          this.removeClanInfo()
          this.getClanInfo(this.playerInfo.clan.tag)
        })
    },
    getPlayerInfo (tag) {
      return axiosIns
        .get(`player/${tag}`)
        .then(res => {
          this.setPlayerInfo(res.data)
        })
    },
    getClanInfo (tag) {
      axios.all([
        axiosIns.get(`/clan/${tag}`),
        axiosIns.get(`/clan/${tag}/warlog`)
      ])
        .then(axios.spread((res1, res2) => {
          const result = []
          const members = res1.data['members']
          const clanInfo = res2.data
          for (let i = 0, len = members.length; i < len; i++) {
            result.push({
              name: members[i].name,
              role: members[i].role,
              participate: 0,
              win: 0,
              rate: 0
            })
          }

          for (let i = 0, len = clanInfo.length; i < len; i++) {
            const participants = clanInfo[i].participants
            participants.forEach((item) => {
              result.forEach((innerItem) => {
                if (innerItem.name === item.name) {
                  innerItem.participate += item.battlesPlayed
                  innerItem.win += item.wins
                }
              })
            })
          }

          for (let i = 0, len = result.length; i < len; i++) {
            result[i].rate = result[i].participate !== 0 && result[i].win !== 0 ? (result[i].win / result[i].participate).toFixed(2) : 0
          }

          this.setClanInfo(result)
        }))
    }
  },
  created () {
    this.fetchData(this.$route.params.tag)
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.tag !== from.params.tag) {
      this.fetchData(to.params.tag)
      next()
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
