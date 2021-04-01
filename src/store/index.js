import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    results: null
  },
  mutations: {
    clearSQLResults(state) {
      state.results = []
    },
    setResults(state, result) {
      state.results = result
    }
  },
  actions: {
    setResults(context, result) {
      context.commit('setResults', result)
    }
  },
  getters: {
    getResults: state => {
      return state.results;
    }
  },  
  modules: {}
})
