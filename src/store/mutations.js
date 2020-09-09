const mutations = {
  updateConnectionInfo (state, { serverUrl, token }) {
    state.serverUrl = serverUrl
    state.token = token
  }
}
export default mutations
