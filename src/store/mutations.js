export default {
  setPlayerInfo (state, info) {
    let exist = false

    state.playerInfo = info
    state.visited.forEach(item => {
      exist = exist || item.name === info.name
    })
    if (!exist) {
      state.visited.push({ name: info.name, tag: info.tag })
      localStorage.setItem('visited', JSON.stringify(state.visited))
    }
  },
  removePlayerInfo (state) {
    state.playerInfo = null
  },
  setClanInfo (state, info) {
    state.clanInfo = info
  },
  removeClanInfo (state) {
    state.clanInfo = null
  },
  clearVisited (state) {
    localStorage.removeItem('visited')
    state.visited = [{ name: 'Limsanity', tag: '20Q2U9UQQ' }]
  }
}
