export const state = () => ({
  sidebarRenderKey: 0
})

export const mutations = {
  changeSidebarRenderKey (state) {
    state.sidebarRenderKey++
  }
}
