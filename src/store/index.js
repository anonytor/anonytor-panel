import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexPersist = new VuexPersistence({
  storage: localStorage
})

export default new Vuex.Store({
  mutations,
  state,
  strict: debug,
  plugins: [vuexPersist.plugin]
})
