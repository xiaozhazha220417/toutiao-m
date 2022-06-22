import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

const TOKEN = 'TOUTIAO_USER'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    user: getItem(TOKEN)
    // user: null
  },
  getters: {},
  mutations: {
    setUser (state, user) {
      state.user = user
      // 保存本地数据
      setItem(TOKEN, state.user)
    }
  },
  actions: {},
  modules: {}
})
