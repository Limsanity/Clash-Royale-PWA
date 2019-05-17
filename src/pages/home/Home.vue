<template>
  <div>
    <div class="swiper">
      <img src="https://royaleapi.com/static/img/carousel/freeze.jpg?t=1547977312.534345" alt="">
    </div>
    <navigation></navigation>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'Home',
  components: {
    Navigation
  }
}
</script>

<style lang="stylus" scoped>
  .swiper
    min-height 3.76rem

    img
      width 100%
      height 100%
</style>
