// 权限控制相关的（如动态添加路由等）
import { asyncRoutes, constantRoutes, resetRouter } from '@/router'

/**
 * @param roleMenus 当前角色所拥有的菜单
 * @param route 所有菜单
 */
function hasPermission (roleMenus, route) {
  // 需要进行权限管控的路由要添加route.meta.roleMenus
  if (route.meta && route.meta.menuName) {
    return roleMenus.includes(route.meta.menuName)
    // return roleMenus.some(item => item === route.meta.menuName)
  } else {
    return true
  }
}

/**
 * @param roleMenus 当前角色所拥有的菜单
 * @param routes 所有菜单
 */
export function filterAsyncRoutes (routes, roleMenus) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roleMenus, tmp)) {
      // 递归遍历每一个路由节点
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roleMenus)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  // 用来渲染左侧菜单
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
  // 重置routes(可有可无吧)
  resetRoutes (state, newRoutes) {
    // 重置路由(包含重置之前路由中动态添加的规则 addRoutes)
    resetRouter()
    state.routes = []
  }
}

const actions = {
  // 得到对应的权限菜单
  generateRoutes ({ commit }, roleMenus) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roleMenus)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
