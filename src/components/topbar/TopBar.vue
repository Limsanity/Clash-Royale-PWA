<template>
  <div class="top-bar">
    <div class="iconlist">
      <v-icon class="item" color="black">search</v-icon>
      <router-link
        class="item"
        tag="span"
        to="/user"
      >
        <v-icon color="black">person</v-icon>
      </router-link>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-icon class="item" v-on="on" color="black">favorite</v-icon>
        </template>
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
      </v-menu>
      <v-icon class="item" color="black">reorder</v-icon>
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
        font-size 25px
</style>
