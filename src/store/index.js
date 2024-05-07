import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:JSON.parse(localStorage.getItem('token_user'))
  },
  getters: {
  },
  mutations: {
    setUser(state,user){
      state.user = user
      localStorage.setItem('token_user',JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }
})
