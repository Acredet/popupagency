export const state = () => ({
  sidebarRenderKey: 0
})

export const mutations = {
  changeSidebarRenderKey (state) {
    state.sidebarRenderKey++
  }
}

export const actions = {
  changeSidebarRenderKey ({ commit }) {
    commit('changeSidebarRenderKey')
  }
}

export const getters = {
  renderKey (state) {
    return state.sidebarRenderKey
  }
}
