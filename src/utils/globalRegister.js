// 全局注册文件

// 挂载到vue原型上
import api from '@/api/index'
// 全局自定义指令
import * as directives from '@/directives'

export default {
  install (Vue) {
    // 挂载到vue原型上
    Vue.prototype.$api = api
    // 全局自定义指令
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key])
    })
  }
}
