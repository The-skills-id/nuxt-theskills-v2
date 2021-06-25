export default {
  namespaced: true,
  state: {
    status: false,
    text: '',
    type: 'success', // warning, error
  },
  mutations: {
    set: (state, payload) => {
      state.status = payload.status
      state.text = payload.text
      state.type = payload.type
    },
  },
  actions: {
    set: ({ commit }, payload) => {
      commit('set', payload)
    },
  },
  getters: {
    status: (state) => state.status,
    text: (state) => state.text,
    type: (state) => state.type,
  },
}

/* 
export const state = () => ({
  status: false,
  text: '',
  type: 'success', // warning, error
})

export const mutations = () => ({
  set: (state, payload) => {
    state.status = payload.status
    state.text = payload.text
    state.type = payload.type
  },
})

export const actions = () => ({
  set: ({ commit }, payload) => {
    commit('set', payload)
  },
})

export const getters = () => ({
  status: (state) => state.status,
  text: (state) => state.text,
  type: (state) => state.type,
})
 */
