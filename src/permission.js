import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar 进度条插件
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title' // 设置网页标题
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // 进度条插件配置项

const whiteList = ['/login'] // 白名单路由

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next('/')
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // 获取用户信息
        const { menus } = await store.dispatch('user/asyncGetInfo')
        const routes = await store.dispatch('permission/generateRoutes', menus)
        // 设置动态路由
        router.addRoutes([
          ...routes,
          {
            path: '*',
            redirect: '/404',
            hidden: true
          }
        ])
        next({ ...to, replace: true })
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
/**
 * 路由跳转逻辑
 * 1.在路由列表里匹配路由
 *    匹配上：
 *           判断是否有token
 *              有token：
 *                   判断是否是跳转到登录页面
 *                      是登录页：
 *                          重定向到首页
 *                      不是登录页：
 *                           判断有用户角色信息（是否刷新）
 *                              有（无刷新）
 *                                  直接next()
 *                              无（刷新）
 *                                  重新获取，动态添加路由，然后next(to.fullpath),
 *                                  添加完路由之后 不能用next()  要用next(to.path) 否则地址不能生效 这算是一个已知 的小缺陷
 *              无token：
 *                判断是否属于白名单
 *                  是
 *                    next()
 *                  否
 *                    跳到登录页面（带上回跳地址to.fullpath）
 *
 *    未匹配上：跳转到404页面
 */
