export default {
  methods: {
    loadImg (dir, name) {
      let result = '/static/images/' + dir + '/' + name
      if (document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0) {
        return result + '.webp'
      } else {
        return result + '.png'
      }
    }
  }
}
