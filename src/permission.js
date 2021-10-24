import router from './router'
import NProgress from 'nprogress' // progress bar 进度条插件
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title' // 设置网页标题

NProgress.configure({ showSpinner: false }) // 进度条插件配置项

// const whiteList = ['/login'] // 白名单路由

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
