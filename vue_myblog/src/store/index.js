import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 保存token字符串
    userinfo: {} // 保存用户信息
  },
  getters: {
    /* username: (state) => {
      return state.userinfo.username
    } */
    // 可以简写
    username: state => state.userinfo.username,
    user_pic: state => state.userinfo.user_pic
  },
  mutations: {
    // 更新token的mutations函数
    updateToken (state, val) {
      state.token = val
    },
    // 更新用户信息
    updateUserInfo (state, val) {
      state.userinfo = val
    }
  },
  actions: {
    async  getUserInfoActions (store) {
      const res = await getUserInfoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data.data)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
