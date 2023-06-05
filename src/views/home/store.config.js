const state = {
  $tags: []
}
const getters = {
  $tags(state) {
    return state.$tags
  }
}
const mutations = {
  setTags(state, payload) {
    state.$tags = payload.res
  }
}
const actions = {
  loadTags({commit},payload) {
    commit({
      type: 'setTags',
      res: payload
    })
  }
}
 
export default { state, actions, mutations, getters }