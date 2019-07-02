<template>
  <div>
    <v-carousel
      height="4.5rem"
      hide-controls="true"
      hide-delimiters="true"
    >
      <v-carousel-item
        v-for="(item, index) in carouselItems"
        :key="index"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <navigation></navigation>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'Home',
  components: {
    Navigation
  },
  data () {
    return {
      carouselItems: [
        { src: 'https://royaleapi.com/static/img/carousel/freeze.jpg?t=1547977312.534345' },
        { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
