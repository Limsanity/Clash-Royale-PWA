<template>
  <div class="top-bar">
    <v-toolbar flat>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Clash Royale</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon><v-icon color="black">search</v-icon></v-btn>
        <v-btn to="/user" icon><v-icon color="black">person</v-icon></v-btn>
        <v-menu
          content-class="topbar__menu"
          offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon><v-icon class="item" v-on="on" color="black">favorite</v-icon></v-btn>
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
      </v-toolbar-items>
    </v-toolbar>
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
    ...mapMutations(['clearVisited'])
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
</style>
