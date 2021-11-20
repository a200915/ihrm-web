// 用户登录、注销、token的储存和删除等

import { login, getUserInfo, getUserDetailById } from '@/api/modules/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {},
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    const { mobile, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: mobile.trim(), password: password })
        .then(response => {
          // vuex中储存token
          commit('SET_TOKEN', response)
          // 将token储存到cookie中
          setToken(response)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 获取用户基本信息
  asyncGetInfo ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      const { roles, userId } = await getUserInfo()
      commit('SET_ROLES', roles.menus)
      const res = await getUserDetailById(userId)
      commit('SET_USER_INFO', res)
      resolve(roles)
    })
  },

  // 用户注销
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      // 删除token
      removeToken()
      // 重置router
      resetRouter()
      // 重置user.js的state
      commit('RESET_STATE')

      resolve()
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
