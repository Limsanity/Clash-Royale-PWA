<template>
  <div class="navigation">
    <ul class="bar" @click="handleBarClick">
      <li
        :class="['item', item === curChoosed ? 'choosed' : '']"
        v-for="(item, index) of barItems"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
    <div class="wrapper">
      <input v-model.lazy="inputVal" type="text" class="search" placeholder="tag e.g.20Q2U9UQQ">
      <span class="icon iconfont" @click="searchPlayer()">&#xe632;</span>
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

    .bar
      display flex
      list-style none
      padding 0
      margin 0
      margin-left .053333rem
      z-index 1

      .item
        height 1.013333rem
        line-height 1.013333rem
        padding 0 .266667rem
        border-bottom solid .053333rem #d4d4d5
        font-size 14px

      .choosed
        border-bottom-color black

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
        outline none
        font-size 16px

      .icon
        position absolute
        top 50%
        transform translateY(-50%)
        right .053333rem
        border solid .4rem #fff

</style>
