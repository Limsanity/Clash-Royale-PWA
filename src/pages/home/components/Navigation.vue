<template>
  <div class="navigation">
    <v-tabs
      class="tabs">
      <v-tab
        v-for="(item, index) of barItems"
        :key="index"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <div class="wrapper">
      <input v-model.lazy="inputVal" type="text" class="search" placeholder="tag e.g.20Q2U9UQQ">
      <v-icon class="icon" @click="searchPlayer()">search</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      barItems: ['Player', 'Clan', 'Clan Name'],
      curChoosed: 'Player',
      inputVal: ''
    }
  },
  computed: {
    playerTag: function () {
      return this.inputVal.includes('#') ? this.inputVal.substring(1) : this.inputVal
    }
  },
  methods: {
    handleBarClick (e) {
      this.curChoosed = e.target.innerText
    },
    searchPlayer () {
      if (this.playerTag) {
        this.$router.push({ name: 'Player', params: { tag: this.playerTag } })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .navigation
    box-sizing border-box
    display flex
    flex-direction column
    justify-content flex-start
    align-items fl
    padding .133333rem .266667rem

    >>> .theme--light
      background-color #fafafa

    >>> .v-tabs__item--active
      color #1890ff

    .wrapper
      position relative
      display flex
      margin-top -.053333rem

      .search
        margin 0
        flex 1
        padding .4rem
        border solid .053333rem #d4d4d5
        border-radius 0 0 .133333rem .133333rem
        background-color #fff
        outline none
        font-size 16px

      .icon
        position absolute
        top 50%
        transform translateY(-50%)
        right .053333rem
        border solid .4rem #fff
        background-color #fff !important

</style>
