export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.playerTag !== to.params.tag) {
        vm.playerTag = to.params.tag
        vm.fetchData(to.params.tag)
      }
    })
  }
}
