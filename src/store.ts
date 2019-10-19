import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid/v4'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

interface RootState {
  uuid: string
}

const vuexLocal = new VuexPersistence<RootState>({
  key: 'rock-paper-scissors',
  storage: window.localStorage
})

const SET_UUID = 'SET_UUID'

export default new Vuex.Store<RootState>({
  state: {
    uuid: ''
  },
  getters: {
    uuid: ({ uuid }) => uuid
  },
  actions: {
    generateUuid({ commit }) {
      commit(SET_UUID)
    }
  },
  mutations: {
    [SET_UUID](state) {
      if (!state.uuid) {
        state.uuid = uuid()
      }
    }
  },
  plugins: [vuexLocal.plugin]
})
