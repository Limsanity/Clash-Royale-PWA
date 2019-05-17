<template>
  <div class="top-bar">
    <div class="iconlist">
      <span class="item iconfont">&#xe632;</span>
      <router-link
        class="item iconfont"
        tag="span"
        to="/user"
      >&#xe66a;</router-link>
      <span class="item iconfont" @click="toggleDropdown">&#xe61e;</span>
      <span class="item iconfont">&#xe6e8;</span>
    </div>
    <div class="dropdown" ref="dropdown" @click="toggleDropdown">
      <router-link
        v-for="(item, index) of visited"
        :key="index"
        tag="div"
        :to="{ name: 'Player', params: { tag: item.tag } }"
        class="item"
      >
        {{ item.name }}
      </router-link>
      <div class="item" @click="clearVisited">-- Clear --</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TopBar',
  data () {
    return {
      dropdownShow: false
    }
  },
  computed: {
    ...mapState(['visited'])
  },
  methods: {
    ...mapMutations(['clearVisited']),
    toggleDropdown (e) {
      this.dropdownShow = !this.dropdownShow
      this.$refs.dropdown.style.maxHeight = this.dropdownShow ? Object.keys(this.visited).length * 100 + 'px' : '0px'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .top-bar
    position fixed
    display flex
    flex-direction column
    width 100%
    z-index 1

    .iconlist
      display flex
      justify-content flex-end
      height 1.216rem
      background-color #fff

      .item
        display flex
        align-items center
        margin 0 .4rem
        font-size 25px;

    .dropdown
      align-self flex-end
      width 2.666667rem
      max-height 0px
      transition max-height 0.5s
      background-color #fff
      overflow hidden

      .item
        padding .2rem 0
        text-align center
        font-size 16px
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        border-left solid .026667rem
        border-bottom solid .026667rem
        border-color rgba(gray, 0.2)
        font-size 12px
        font-weight bold

        &:nth-last-child(1)
          border-bottom-left-radius .133333rem
</style>
